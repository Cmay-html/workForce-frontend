import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'md',
  ...props
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';

  const glassClasses = glass
    ? 'bg-dark-900/90 backdrop-blur-xl border border-primary-300/30 shadow-glass'
    : 'bg-dark-900/95 border border-primary-300/20 shadow-glass';

  const hoverClasses = hover
    ? 'hover:shadow-glass-hover hover:transform hover:scale-105 hover:-translate-y-2 animate-glow'
    : '';

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
