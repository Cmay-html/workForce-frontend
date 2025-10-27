import React from 'react';
import ReviewForm from '../../../components/client/reviews/ReviewForm';

const CreateReviewPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Review</h1>
      <ReviewForm />
    </div>
  );
};

export default CreateReviewPage;
