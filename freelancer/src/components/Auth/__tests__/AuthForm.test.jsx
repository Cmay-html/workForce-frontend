import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm';

// Mock useNavigate to observe navigations
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('AuthForm', () => {
  let navigateSpy;

  beforeEach(() => {
    navigateSpy = vi.fn();
    (useNavigate).mockReturnValue(navigateSpy);
  });

  it('shows login form by default and toggles to signup', () => {
    renderWithRouter(<AuthForm />);

    // Default view
    expect(screen.getByText(/Login Form/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toHaveClass('active');

    // Toggle to signup
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));
    expect(screen.getByText(/Signup Form/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Signup$/i })).toHaveClass('active');
  });

  it('navigates to /dashboard after login submit', () => {
    renderWithRouter(<AuthForm />);

    // Fill minimal required inputs
    const emailInputs = screen.getAllByPlaceholderText(/Email Address/i);
    const pwdInputs = screen.getAllByPlaceholderText(/Password/i);
    // On login form there are 1 email and 1 password input
    fireEvent.change(emailInputs[0], { target: { value: 'user@example.com' } });
    fireEvent.change(pwdInputs[0], { target: { value: 'secret' } });

    fireEvent.submit(screen.getByRole('button', { name: /^Login$/i }).closest('form'));

    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to /dashboard after signup submit', () => {
    renderWithRouter(<AuthForm />);

    // Switch to signup
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    const email = screen.getByPlaceholderText(/Email Address/i);
    const pwd = screen.getByPlaceholderText(/^Password$/i);
    const confirm = screen.getByPlaceholderText(/Confirm password/i);

    fireEvent.change(email, { target: { value: 'new@example.com' } });
    fireEvent.change(pwd, { target: { value: 'secret' } });
    fireEvent.change(confirm, { target: { value: 'secret' } });

    // Submit signup form
    const signupForm = screen.getByRole('button', { name: /^Signup$/i }).closest('form');
    fireEvent.submit(signupForm);

    expect(navigateSpy).toHaveBeenCalledWith('/dashboard');
  });

  it('switches views via inline links (Signup now / Login here)', () => {
    renderWithRouter(<AuthForm />);

    // Click Signup now link
    const signupNow = screen.getByText(/Signup now/i);
    fireEvent.click(signupNow);
    expect(screen.getByText(/Signup Form/i)).toBeInTheDocument();

    // Click Login here link
    const loginHere = screen.getByText(/Login here/i);
    fireEvent.click(loginHere);
    expect(screen.getByText(/Login Form/i)).toBeInTheDocument();
  });

  it('renders forgot password link on login form only', () => {
    renderWithRouter(<AuthForm />);

    expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Signup/i }));

    expect(screen.queryByText(/Forgot password\?/i)).not.toBeInTheDocument();
  });
});
