'use client';

import React, { useState } from 'react';

export default function PluginEditorPage() {
  const [pluginName, setPluginName] = useState('');
  const [description, setDescription] = useState('');
  const [codePreview, setCodePreview] = useState('');

  const generateCode = () => {
    const code = `
      // Auto-generated Plugin
      export default function ${pluginName.replace(/\s/g, '')}Plugin() {
        return (
          <div>
            <h1>${pluginName}</h1>
            <p>${description}</p>
          </div>
        );
      }
    `;
    setCodePreview(code);
  };

  return (
    <div>
      <h2>Create Your Plugin</h2>
      
      <input
        type="text"
        placeholder="Plugin Name"
        value={pluginName}
        onChange={(e) => setPluginName(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />

      <button
        onClick={generateCode}
        style={{
          padding: '10px 20px',
          backgroundColor: '#00ffdd',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Generate Plugin Code
      </button>

      <h3 style={{ marginTop: '20px' }}>Live Plugin Preview:</h3>
      <pre style={{
        backgroundColor: '#111',
        color: '#0f0',
        padding: '20px',
        borderRadius: '10px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      }}>
        {codePreview}
      </pre>
    </div>
  );
}
