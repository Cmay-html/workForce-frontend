import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AuthForm from '../components/shared/auth/AuthForm';
import { renderWithProviders, createUnauthenticatedState } from '../test/test-utils';

// Mock the useAuth hook
vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    ...createUnauthenticatedState(),
    login: vi.fn(),
  })),
}));

describe('AuthForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    const { useAuth } = require('../hooks/useAuth');
    useAuth.mockReturnValue({
      ...createUnauthenticatedState(),
      login: mockLogin,
    });
  });

  describe('Login Form', () => {
    beforeEach(() => {
      renderWithProviders(<AuthForm />);
    });

    test('renders login form by default', () => {
      expect(screen.getByText('Login Form')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('allows user to type in email and password', async () => {
      const user = userEvent.setup();
      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/^password$/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    test('calls login function on form submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({ success: true });

      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/^password$/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }, 'client');
    });

    test('shows error message on login failure', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Invalid credentials'));

      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/^password$/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Authentication failed. Please try again.')).toBeInTheDocument();
      });
    });
  });

  describe('Registration Form', () => {
    test('switches to registration form when signup button is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AuthForm />);

      const signupButton = screen.getByRole('button', { name: /signup/i });
      await user.click(signupButton);

      expect(screen.getByText('Signup Form')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    });

    test('calls login function on registration submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({ success: true });

      renderWithProviders(<AuthForm />);

      // Switch to registration
      const signupButton = screen.getByRole('button', { name: /signup/i });
      await user.click(signupButton);

      // Fill form
      await user.type(screen.getByPlaceholderText(/first name/i), 'John');
      await user.type(screen.getByPlaceholderText(/last name/i), 'Doe');
      await user.type(screen.getByPlaceholderText(/email address/i), 'john@example.com');
      await user.type(screen.getByPlaceholderText(/^password$/i), 'password123');
      await user.type(screen.getByPlaceholderText(/confirm password/i), 'password123');

      // Submit
      const submitButton = screen.getByRole('button', { name: /signup/i });
      await user.click(submitButton);

      expect(mockLogin).toHaveBeenCalledWith({
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe'
      }, 'client');
    });
  });

  describe('Form Validation', () => {
    test('shows validation errors for empty fields', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AuthForm />);

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    test('shows validation error for invalid email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AuthForm />);

      const emailInput = screen.getByPlaceholderText(/email address/i);
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    });

    test('shows validation error for short password', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AuthForm />);

      const passwordInput = screen.getByPlaceholderText(/^password$/i);
      await user.type(passwordInput, '123');

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    test('shows loading state during submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));

      renderWithProviders(<AuthForm />);

      const emailInput = screen.getByPlaceholderText(/email address/i);
      const passwordInput = screen.getByPlaceholderText(/^password$/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(screen.getByDisplayValue(/please wait/i)).toBeInTheDocument();
    });
  });
});
