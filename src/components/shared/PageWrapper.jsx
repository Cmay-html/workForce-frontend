import React from 'react';

const PageWrapper = ({ 
  title, 
  subtitle, 
  children, 
  headerActions = null,
  className = ""
}) => {
  return (
    <div className={`p-8 bg-gray-50 min-h-screen ${className}`}>
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        {headerActions && (
          <div className="flex gap-3">
            {headerActions}
          </div>
        )}
      </div>

      {/* Page Content */}
      <div className="space-y-8">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
