'use client';

import React, { useState } from 'react';

export default function PluginEditorPage() {
  const [pluginName, setPluginName] = useState('');
  const [description, setDescription] = useState('');
  const [codePreview, setCodePreview] = useState('');

  const generateCode = () => {
    const code = `// Auto-generated Plugin
export default function ${pluginName.replace(/\s/g, '')}Plugin() {
  return (
    <div>
      <h1>${pluginName}</h1>
      <p>${description}</p>
    </div>
  );
}`;
    setCodePreview(code);
  };

  return (
    <main style={{
      padding: '40px',
      fontFamily: 'monospace',
      background: '#1e1e2f',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px', color: '#00ffd5' }}>
        🧠 Plugin Builder Studio
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter Plugin Name"
          value={pluginName}
          onChange={(e) => setPluginName(e.target.value)}
          style={{ padding: '10px', width: '60%', marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px', width: '60%', marginTop: '10px' }}
        />
        <br />
        <button onClick={generateCode} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#00ffd5', border: 'none', color: '#000' }}>
          ⚡ Generate Plugin Code
        </button>
      </div>

      {codePreview && (
        <pre style={{
          background: '#121212',
          padding: '20px',
          borderRadius: '10px',
          whiteSpace: 'pre-wrap'
        }}>
{codePreview}
        </pre>
      )}
    </main>
  );
}
