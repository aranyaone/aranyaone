'use client';

import React from 'react';

export default function PluginViewerPage() {
  const plugin = {
    name: 'My Sample Plugin',
    description: 'This is a test plugin created via Aranya Plugin Editor.',
    code: `export default function SamplePlugin() {
      return <div>Hello Plugin!</div>;
    }`
  };

  return (
    <div style={{ padding: '40px', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>🔍 Plugin Viewer</h1>
      <h2>{plugin.name}</h2>
      <p>{plugin.description}</p>
      <pre style={{ background: '#222', color: '#0f0', padding: '20px' }}>
        {plugin.code}
      </pre>
    </div>
  );
}
