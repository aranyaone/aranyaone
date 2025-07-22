import { memo } from 'react';

const FormGroup = memo(function FormGroup({ children, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
});

const FormLabel = memo(function FormLabel({ children, htmlFor, required = false, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

const FormInput = memo(function FormInput({ 
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  ...props 
}) {
  const inputClasses = `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${className}
  `;
  
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={inputClasses}
      {...props}
    />
  );
});

const FormTextarea = memo(function FormTextarea({ 
  id,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  rows = 3,
  className = '',
  ...props 
}) {
  const textareaClasses = `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${className}
  `;
  
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      className={textareaClasses}
      {...props}
    />
  );
});

const FormSelect = memo(function FormSelect({ 
  id,
  value,
  onChange,
  options = [],
  error,
  disabled = false,
  placeholder,
  className = '',
  ...props 
}) {
  const selectClasses = `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${className}
  `;
  
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={selectClasses}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

const FormError = memo(function FormError({ children, className = '' }) {
  if (!children) return null;
  
  return (
    <div className={`text-sm text-red-600 mt-1 ${className}`}>
      {children}
    </div>
  );
});

const FormHelp = memo(function FormHelp({ children, className = '' }) {
  if (!children) return null;
  
  return (
    <div className={`text-sm text-gray-500 mt-1 ${className}`}>
      {children}
    </div>
  );
});

const Form = memo(function Form({ children, onSubmit, className = '', ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={className} {...props}>
      {children}
    </form>
  );
});

// Compound component setup
Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Input = FormInput;
Form.Textarea = FormTextarea;
Form.Select = FormSelect;
Form.Error = FormError;
Form.Help = FormHelp;

export default Form;