const variants = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-black text-white',
  secondary: 'bg-gray-200 text-gray-700',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  gold: 'bg-amber-500 text-black',
  ortline: 'border border-gray-300 text-gray-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium';
  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size] || sizes.md;
  const roundedClasses = rounded ? 'rounded-full' : 'rounded';

  return (
    <span
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${roundedClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
