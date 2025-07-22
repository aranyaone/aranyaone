import { memo } from 'react';

const Card = memo(function Card({ 
  children, 
  className = '', 
  padding = 'p-6',
  shadow = 'shadow-lg',
  ...props 
}) {
  const baseClasses = 'bg-white rounded-xl border border-gray-200';
  const classes = `${baseClasses} ${shadow} ${padding} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
});

const CardHeader = memo(function CardHeader({ children, className = '' }) {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
});

const CardTitle = memo(function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
});

const CardContent = memo(function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
});

const CardFooter = memo(function CardFooter({ children, className = '' }) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
});

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;