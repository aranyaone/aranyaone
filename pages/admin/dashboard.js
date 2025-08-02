import dynamic from 'next/dynamic';
import React from 'react';

const FeedbackDashboard = dynamic(() => import('../../components/FeedbackDashboard'), { ssr: false, loading: () => <div>Loading Dashboard...</div> });

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FeedbackDashboard />
    </div>
  );
}
