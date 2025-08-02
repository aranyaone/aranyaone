'use client';
import React, { Suspense } from 'react';
import EmpireControlTower from '../components/EmpireControlTower';

// Loading component
function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white">Loading Empire Control Tower...</h2>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <EmpireControlTower />
    </Suspense>
  );
}
