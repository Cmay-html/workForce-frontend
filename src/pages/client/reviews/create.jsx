import React, { useState } from 'react';

const CreateReviewPage = ({
  embedded = false,
  freelancerId = '',
  freelancerName = '',
  projectId = '',
  onCancel,
  onSubmit
}) => {
  const [review, setReview] = useState({
    freelancerId: freelancerId,
    rating: 5,
    comment: '',
    projectId: projectId
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(review);
    } else {
      // Default behavior for standalone page
      // API call to submit review
    }
  };

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value
    });
  };

  const content = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!embedded && <h1 className="text-3xl font-bold mb-8">Submit Review</h1>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Freelancer</label>
        {embedded ? (
          <input
            type="text"
            value={freelancerName}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
          />
        ) : (
          <select
            name="freelancerId"
            value={review.freelancerId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          >
            <option value="">Select Freelancer</option>
            <option value="1">John Doe</option>
            <option value="2">Jane Smith</option>
          </select>
        )}
      </div>

      {!embedded && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Project</label>
          <select
            name="projectId"
            value={review.projectId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            required
          >
            <option value="">Select Project</option>
            <option value="1">Website Development</option>
            <option value="2">Mobile App Design</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center mt-2 space-x-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setReview({...review, rating: star})}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                star <= review.rating
                  ? 'bg-primary-500 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {star}
            </button>
          ))}
          <span className="ml-2 text-gray-600">{review.rating}/5</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Comment</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Share your experience working with this freelancer..."
          required
        />
      </div>

      <div className={`flex gap-4 ${embedded ? 'justify-end' : ''}`}>
        {embedded && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-primary-500 text-white py-2 px-6 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Submit Review
        </button>
      </div>
    </form>
  );

  return embedded ? content : (
    <div className="h-full p-12" style={{ minWidth: '1024px' }}>
      <div className="mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Review</h1>
        <p className="text-gray-600">Share your experience with the freelancer</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        {content}
      </div>
    </div>
  );
};

export default CreateReviewPage;
