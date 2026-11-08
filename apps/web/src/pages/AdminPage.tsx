import React, { useState, useEffect } from 'react';
import { Lock, LogOut, CheckCircle2, Archive, Trash2, Mail, RefreshCw, Eye, X, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || ''
).replace(/\/$/, '');

const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

interface Submission {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  service_type?: string | null;
  budget_range?: string | null;
  project_deadline?: string | null;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
  updated_at: string;
}

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>(() => sessionStorage.getItem('admin_token') || '');
  const [isDbConnected, setIsDbConnected] = useState<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Submissions State
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  const [isFetchingSubmissions, setIsFetchingSubmissions] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  // Check auth session
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (authToken: string) => {
    try {
      const res = await fetch(apiUrl('/api/admin/me'), {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        if (typeof data.databaseConnected === 'boolean') {
          setIsDbConnected(data.databaseConnected);
        }
        fetchSubmissions(authToken, statusFilter);
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_token');
        setToken('');
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const res = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setToken(data.token);
        sessionStorage.setItem('admin_token', data.token);
        if (typeof data.databaseConnected === 'boolean') {
          setIsDbConnected(data.databaseConnected);
        }
        fetchSubmissions(data.token, statusFilter);
      } else {
        setLoginError(data.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setLoginError('Unable to reach backend API. Please ensure the API server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(apiUrl('/api/admin/logout'), { method: 'POST' });
    } catch (_) { }
    setIsAuthenticated(false);
    setToken('');
    sessionStorage.removeItem('admin_token');
    setSubmissions([]);
  };

  const fetchSubmissions = async (authToken = token, filter = statusFilter) => {
    setIsFetchingSubmissions(true);
    try {
      const endpoint = filter === 'all' ? '/api/admin/submissions' : `/api/admin/submissions?status=${filter}`;
      const res = await fetch(apiUrl(endpoint), {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(data.data);
      }
    } catch (err) {
      console.error('Failed to load submissions:', err);
    } finally {
      setIsFetchingSubmissions(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'unread' | 'read' | 'archived') => {
    try {
      const res = await fetch(apiUrl(`/api/admin/submissions/${id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setActionMessage(`Status updated to ${newStatus}`);
        setTimeout(() => setActionMessage(''), 3000);
        fetchSubmissions(token, statusFilter);
        if (activeSubmission && activeSubmission.id === id) {
          setActiveSubmission({ ...activeSubmission, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this submission?')) {
      return;
    }

    try {
      const res = await fetch(apiUrl(`/api/admin/submissions/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionMessage('Submission deleted successfully');
        setTimeout(() => setActionMessage(''), 3000);
        if (activeSubmission?.id === id) {
          setActiveSubmission(null);
        }
        fetchSubmissions(token, statusFilter);
      }
    } catch (err) {
      console.error('Failed to delete submission:', err);
    }
  };

  // If NOT authenticated, render Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-brand-purple-light dark:bg-brand-dark-purple/20 text-brand-purple">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-text dark:text-brand-dark-text">
                Admin Authentication
              </h1>
              <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary">
                Protected Submissions Portal
              </p>
            </div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-text dark:text-brand-dark-text mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg border border-brand-border dark:border-brand-dark-border text-sm text-brand-text dark:text-brand-dark-text focus:outline-none focus:ring-2 focus:ring-brand-purple"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-xl text-sm font-semibold transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple disabled:opacity-70 cursor-pointer"
              >
                {isLoading ? 'Verifying credentials...' : 'Sign In to Portal'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-brand-border dark:border-brand-dark-border text-center">
            <Link
              to="/"
              className="text-xs text-brand-text-secondary hover:text-brand-purple transition-colors"
            >
              ← Return to Portfolio Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard View
  const unreadCount = submissions.filter((s) => s.status === 'unread').length;

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border dark:border-brand-dark-border">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text dark:text-brand-dark-text flex items-center gap-2">
              <span>Contact Submissions</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-purple-light dark:bg-brand-dark-purple/30 text-brand-purple dark:text-brand-dark-purple font-mono font-bold">
                {submissions.length} Total
              </span>
            </h1>
            {isDbConnected ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Neon PostgreSQL Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Local Storage Mode
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-brand-text-secondary dark:text-brand-dark-text-secondary mt-1">
            Persisted in {isDbConnected ? 'Neon PostgreSQL database' : 'local storage'} via the backend API.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchSubmissions()}
            className="p-2 rounded-xl border border-brand-border dark:border-brand-dark-border text-brand-text hover:text-brand-purple transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${isFetchingSubmissions ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-brand-text dark:text-brand-dark-text transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-brand-purple-light dark:bg-brand-dark-purple/20 text-brand-purple dark:text-brand-dark-purple text-xs font-medium rounded-xl border border-brand-purple/20">
          {actionMessage}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(['all', 'unread', 'read', 'archived'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setStatusFilter(filter);
              fetchSubmissions(token, filter);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${statusFilter === filter
              ? 'bg-brand-purple text-white shadow-sm'
              : 'bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border text-brand-text-secondary hover:text-brand-text dark:hover:text-white'
              }`}
          >
            {filter} {filter === 'unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
          </button>
        ))}
      </div>

      {/* Submissions Table / Cards */}
      {submissions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl">
          <Mail className="w-10 h-10 text-brand-text-secondary dark:text-brand-dark-text-secondary mx-auto mb-3 opacity-40" />
          <h3 className="text-base font-bold text-brand-text dark:text-brand-dark-text">No Submissions Found</h3>
          <p className="text-xs text-brand-text-secondary dark:text-brand-dark-text-secondary mt-1">
            {statusFilter === 'all'
              ? 'New inquiries submitted via the homepage contact form will be displayed here.'
              : `There are currently no submissions with the "${statusFilter}" status.`}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-brand-border dark:border-brand-dark-border bg-brand-bg-secondary dark:bg-brand-dark-bg text-brand-text-secondary dark:text-brand-dark-text-secondary font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Sender</th>
                <th className="py-3.5 px-4">Subject / Service</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border dark:divide-brand-dark-border text-brand-text dark:text-brand-dark-text">
              {submissions.map((sub) => (
                <tr
                  key={sub.id}
                  className={`hover:bg-brand-bg-secondary/60 dark:hover:bg-brand-dark-bg/40 transition-colors ${sub.status === 'unread' ? 'font-semibold bg-brand-purple-light/10' : ''
                    }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold">{sub.name}</div>
                    <div className="text-[11px] text-brand-text-secondary dark:text-brand-dark-text-secondary">
                      {sub.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate">
                    <div>{sub.subject || sub.service_type || 'General Inquiry'}</div>
                    <div className="text-[11px] text-brand-text-secondary dark:text-brand-dark-text-secondary truncate">
                      {sub.message}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-brand-text-secondary dark:text-brand-dark-text-secondary">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === 'unread'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300'
                        : sub.status === 'read'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => setActiveSubmission(sub)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-brand-text hover:text-brand-purple transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {sub.status !== 'read' && (
                      <button
                        onClick={() => handleStatusChange(sub.id, 'read')}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-600 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    {sub.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusChange(sub.id, 'archived')}
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submission Detail Modal */}
      {activeSubmission && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveSubmission(null)}
        >
          <div
            className="bg-white dark:bg-brand-dark-card border border-brand-border dark:border-brand-dark-border rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start pb-4 border-b border-brand-border dark:border-brand-dark-border">
              <div>
                <h3 className="text-lg font-bold text-brand-text dark:text-brand-dark-text">
                  Inquiry from {activeSubmission.name}
                </h3>
                <p className="text-xs text-brand-purple font-medium">
                  {activeSubmission.email}
                </p>
              </div>
              <button
                onClick={() => setActiveSubmission(null)}
                className="p-1 rounded-lg text-brand-text-secondary hover:text-brand-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-brand-bg-secondary dark:bg-brand-dark-bg p-3.5 rounded-xl border border-brand-border dark:border-brand-dark-border">
              <div>
                <span className="text-brand-text-secondary dark:text-brand-dark-text-secondary block">Service Type</span>
                <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                  {activeSubmission.service_type || 'General'}
                </span>
              </div>
              <div>
                <span className="text-brand-text-secondary dark:text-brand-dark-text-secondary block">Budget Range</span>
                <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                  {activeSubmission.budget_range || 'Not specified'}
                </span>
              </div>
              <div>
                <span className="text-brand-text-secondary dark:text-brand-dark-text-secondary block">Target Timeline / Deadline</span>
                <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                  {activeSubmission.project_deadline || 'Flexible'}
                </span>
              </div>
              <div>
                <span className="text-brand-text-secondary dark:text-brand-dark-text-secondary block">Submitted On</span>
                <span className="font-semibold text-brand-text dark:text-brand-dark-text">
                  {new Date(activeSubmission.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-brand-text-secondary dark:text-brand-dark-text-secondary block mb-1">
                Message Content:
              </span>
              <div className="p-4 rounded-xl bg-brand-bg-secondary dark:bg-brand-dark-bg text-sm text-brand-text dark:text-brand-dark-text whitespace-pre-wrap leading-relaxed border border-brand-border dark:border-brand-dark-border max-h-60 overflow-y-auto">
                {activeSubmission.message}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-brand-border dark:border-brand-dark-border">
              <a
                href={`mailto:${activeSubmission.email}?subject=${encodeURIComponent(
                  'Re: ' + (activeSubmission.subject || 'Portfolio Inquiry')
                )}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple-hover text-white rounded-xl text-xs font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> Reply via Email
              </a>

              <div className="flex gap-2">
                {activeSubmission.status !== 'read' && (
                  <button
                    onClick={() => handleStatusChange(activeSubmission.id, 'read')}
                    className="px-3 py-1.5 rounded-lg border border-brand-border text-xs font-medium hover:border-brand-purple"
                  >
                    Mark Read
                  </button>
                )}
                {activeSubmission.status !== 'archived' && (
                  <button
                    onClick={() => handleStatusChange(activeSubmission.id, 'archived')}
                    className="px-3 py-1.5 rounded-lg border border-brand-border text-xs font-medium hover:border-brand-purple"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
