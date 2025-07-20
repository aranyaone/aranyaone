import { useState } from 'react';
import { useRewardCodes } from '../../hooks/useRewards';
import { useNotification } from '../../contexts/NotificationContext';

const RewardCodeGenerator = () => {
  const [config, setConfig] = useState({
    type: 'discount',
    value: 10,
    count: 1,
    expiresIn: 30
  });
  
  const { codes, loading, generateCode, generateBulkCodes, deactivateCode } = useRewardCodes();
  const { showSuccess, showError } = useNotification();

  const handleGenerateSingle = async () => {
    try {
      const newCode = await generateCode(config.type, config.value, config.expiresIn);
      showSuccess(`Code generated: ${newCode.code}`);
    } catch (error) {
      showError('Failed to generate code');
    }
  };

  const handleGenerateBulk = async () => {
    try {
      const newCodes = await generateBulkCodes(config.count, config.type, config.value, config.expiresIn);
      showSuccess(`Generated ${newCodes.length} codes successfully`);
    } catch (error) {
      showError('Failed to generate codes');
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showSuccess('Code copied to clipboard');
  };

  const exportCodes = () => {
    const csv = [
      ['Code', 'Type', 'Value', 'Expires At', 'Status'],
      ...codes.map(code => [
        code.code,
        code.type,
        code.value,
        new Date(code.expiresAt).toLocaleDateString(),
        code.isActive ? (code.usedAt ? 'Used' : 'Active') : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reward_codes.csv';
    a.click();
    URL.revokeObjectURL(url);
    showSuccess('Codes exported to CSV');
  };

  const getTypeIcon = (type) => {
    const icons = {
      discount: '💰',
      trial: '⏰',
      feature: '🔓',
      credit: '💳'
    };
    return icons[type] || '🎁';
  };

  const getStatusColor = (code) => {
    if (!code.isActive) return 'bg-gray-100 text-gray-800';
    if (code.usedAt) return 'bg-red-100 text-red-800';
    if (new Date(code.expiresAt) < new Date()) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (code) => {
    if (!code.isActive) return 'Inactive';
    if (code.usedAt) return 'Used';
    if (new Date(code.expiresAt) < new Date()) return 'Expired';
    return 'Active';
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          🎁 Reward Code Generator
        </h3>
        <p className="text-sm text-gray-600">
          Generate promotional codes for discounts, trials, and rewards
        </p>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={config.type}
            onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="discount">💰 Discount</option>
            <option value="trial">⏰ Trial</option>
            <option value="feature">🔓 Feature</option>
            <option value="credit">💳 Credit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            type="number"
            value={config.value}
            onChange={(e) => setConfig(prev => ({ ...prev, value: parseInt(e.target.value) }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Count (Bulk)
          </label>
          <input
            type="number"
            value={config.count}
            onChange={(e) => setConfig(prev => ({ ...prev, count: parseInt(e.target.value) }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expires In (Days)
          </label>
          <input
            type="number"
            value={config.expiresIn}
            onChange={(e) => setConfig(prev => ({ ...prev, expiresIn: parseInt(e.target.value) }))}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="365"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={handleGenerateSingle}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Single Code'}
        </button>
        
        <button
          onClick={handleGenerateBulk}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : `Generate ${config.count} Codes`}
        </button>

        {codes.length > 0 && (
          <button
            onClick={exportCodes}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            📥 Export CSV
          </button>
        )}
      </div>

      {/* Generated Codes */}
      {codes.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Generated Codes ({codes.length})
          </h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {codes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-mono text-sm font-medium text-gray-900">
                          {code.code}
                        </span>
                        <button
                          onClick={() => copyCode(code.code)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                          title="Copy code"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getTypeIcon(code.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {code.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            {code.value}{code.type === 'discount' ? '%' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(code)}`}>
                        {getStatusText(code)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(code.expiresAt).toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {code.isActive && !code.usedAt && (
                        <button
                          onClick={() => deactivateCode(code.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardCodeGenerator;