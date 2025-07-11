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
    <div style={{ padding: '40px', background: '#0a0a0a', borderRadius: '8px', color: '#fff' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{plugin.name}</h2>
      <p style={{ fontSize: '18px', marginBottom: '20px' }}>{plugin.description}</p>
      <pre style={{
        background: '#1a1a1a',
        color: '#0f0',
        padding: '20px',
        borderRadius: '8px',
        overflowX: 'auto'
      }}>
        <code>{plugin.code}</code>
      </pre>
    </div>
  );
}
