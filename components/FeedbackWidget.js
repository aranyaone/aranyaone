"use client";
import React, { useState } from 'react';

const FeedbackWidget = ({ service }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, feedback }),
      });
      if (!res.ok) throw new Error('Failed to submit feedback');
      setSubmitted(true);
    } catch (err) {
      setError('Error submitting feedback. Please try again.');
    }
  };

  if (submitted) {
    return <div className="p-4 bg-green-100 text-green-800 rounded">Thank you for your feedback!</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border rounded shadow max-w-md mx-auto">
      <label className="block mb-2 font-bold text-gray-700">Feedback for {service}:</label>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        required
        placeholder={`Share your thoughts about ${service}...`}
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </form>
  );
};

export default FeedbackWidget;
