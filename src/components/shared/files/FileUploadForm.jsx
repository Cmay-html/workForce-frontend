import React, { useState } from 'react';

const FileUploadForm = ({ projectId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);

    // Simulate file upload
    try {
      console.log('Uploading files:', files);
      // Here you would make actual API call to upload files
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Files uploaded successfully');
      setFiles([]);
      // Reset file input
      e.target.reset();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Upload Files</h3>

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Files
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={uploading}
          />
        </div>

        {files.length > 0 && (
          <div className="border rounded-lg p-4 border-gray-200">
            <h4 className="font-medium text-gray-700 mb-2">Selected Files:</h4>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="truncate flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-800 ml-2"
                    disabled={uploading}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={files.length === 0 || uploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
        </button>
      </form>

      {/* File List Section */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-700 mb-4">Project Files</h4>
        <div className="border rounded-lg divide-y border-gray-200">
          <div className="p-4 text-center text-gray-500">
            No files uploaded yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;