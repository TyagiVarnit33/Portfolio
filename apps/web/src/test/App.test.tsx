import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.js';

describe('Varnit Tyagi Portfolio - Frontend Integration Tests', () => {
  it('renders the brand name, headline, and primary greeting', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Verify brand
    expect(screen.getAllByText(/VARNIT TYAGI/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Hey, I'm Varnit/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Frontend/i);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Developer/i);
  });

  it('renders all featured projects and their details', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Echelon — Clothing E-commerce Website/i)).toBeInTheDocument();
    expect(screen.getByText(/AI SaaS Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/React Blog App/i)).toBeInTheDocument();
  });

  it('renders truthful education details for CGC University', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/CGC University, Mohali/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/8.16/i).length).toBeGreaterThan(0);
  });

  it('navigates to a project case study page successfully', () => {
    render(
      <MemoryRouter initialEntries={['/projects/echelon']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Project Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Problem & Objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to Selected Work/i)).toBeInTheDocument();
  });

  it('renders the admin login portal at /admin', () => {
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Admin Authentication/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In to Portal/i })).toBeInTheDocument();
  });

  it('renders 404 not found page for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route-slug']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
