import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-primary text-white shadow-glass hover:shadow-glass-hover hover:transform hover:scale-105 active:scale-95 animate-float-fast',
    secondary: 'bg-glass-card text-white border border-primary-300 shadow-glass hover:shadow-glass-hover hover:bg-primary-900/20 hover:transform hover:scale-105',
    ghost: 'text-primary-300 hover:text-white hover:bg-primary-900/30 hover:transform hover:scale-105',
    danger: 'bg-accent-500 text-white hover:bg-accent-600 shadow-glass hover:shadow-glass-hover hover:transform hover:scale-105',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
