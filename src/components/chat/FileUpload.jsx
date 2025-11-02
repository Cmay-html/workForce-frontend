import React, { useRef, useState } from 'react';

const FileUpload = ({ onFileSelect, children, disabled, accept, multiple = true }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(files);
    }
    // Reset input
    e.target.value = '';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      onFileSelect(files);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer ${dragOver ? 'opacity-70' : ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {children}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept || "image/*,.pdf,.doc,.docx,.txt"}
        multiple={multiple}
        className="hidden"
      />
    </>
  );
};

export default FileUpload;
