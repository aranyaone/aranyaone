import { memo, useState } from 'react';

const PDFExportButton = memo(function PDFExportButton({ 
  data,
  filename = 'export',
  buttonText = 'Export PDF',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onExportStart,
  onExportComplete,
  onExportError
}) {
  const [isExporting, setIsExporting] = useState(false);

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-600'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const generatePDF = async () => {
    try {
      setIsExporting(true);
      if (onExportStart) onExportStart();

      // Simulate PDF generation (in a real app, you'd use a library like jsPDF or html2pdf)
      const mockPDFGeneration = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Mock success/failure
            if (Math.random() > 0.1) { // 90% success rate
              resolve('PDF generated successfully');
            } else {
              reject(new Error('Failed to generate PDF'));
            }
          }, 2000); // 2 second delay to simulate processing
        });
      };

      await mockPDFGeneration();

      // Create a mock download
      const blob = new Blob(['Mock PDF content'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (onExportComplete) onExportComplete();
    } catch (error) {
      console.error('PDF export failed:', error);
      if (onExportError) onExportError(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={disabled || isExporting}
      className={`
        inline-flex items-center justify-center
        border rounded-lg font-medium
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isExporting ? 'cursor-wait' : 'cursor-pointer'}
      `}
      aria-label={isExporting ? 'Exporting PDF...' : buttonText}
    >
      {/* Icon */}
      <div className="mr-2">
        {isExporting ? (
          // Loading spinner
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          // PDF icon
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </div>

      {/* Button text */}
      <span>
        {isExporting ? 'Exporting...' : buttonText}
      </span>
    </button>
  );
});

// Advanced PDF export with options
const AdvancedPDFExportButton = memo(function AdvancedPDFExportButton({
  data,
  filename = 'export',
  onExport
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState({
    format: 'A4',
    orientation: 'portrait',
    includeImages: true,
    includeHeaders: true,
    quality: 'high'
  });

  const handleExport = () => {
    if (onExport) {
      onExport({ data, options, filename });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        📄 Export PDF
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4 space-y-4">
            <h3 className="font-medium text-gray-900">Export Options</h3>
            
            {/* Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                value={options.format}
                onChange={(e) => setOptions({...options, format: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
                <option value="Legal">Legal</option>
              </select>
            </div>

            {/* Orientation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Orientation
              </label>
              <select
                value={options.orientation}
                onChange={(e) => setOptions({...options, orientation: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.includeImages}
                  onChange={(e) => setOptions({...options, includeImages: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include Images</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.includeHeaders}
                  onChange={(e) => setOptions({...options, includeHeaders: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include Headers</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleExport}
                className="flex-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

PDFExportButton.Advanced = AdvancedPDFExportButton;

export default PDFExportButton;