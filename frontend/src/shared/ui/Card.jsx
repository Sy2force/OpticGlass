const variants = {
  default: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-lg',
  glass: 'bg-white/10 backdrop-blur-lg border border-white/20',
  dark: 'bg-gray-900 text-white border border-gray-800',
  gradient: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
};

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
  onClick,
  ...props
}) => {
  const baseClasses = 'rounded-xl overflow-hidden';
  const variantClasses = variants[variant] || variants.default;
  const hoverClasses = hover
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-gray-200 ${className}`}>{children}</div>
);

const CardImage = ({ src, alt, className = '' }) => (
  <div className={`aspect-square overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
