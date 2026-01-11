import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';

/**
 * Premium Button Component - Apple-style design
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="outline" loading>Loading...</Button>
 */

const variants = {
  primary: 'bg-primary hover:bg-primary-600 text-white shadow-premium hover:shadow-premium-lg active:scale-95',
  secondary: 'bg-dark-800 hover:bg-dark-700 text-white shadow-lg active:scale-95',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-95',
  ghost: 'text-dark-700 hover:bg-dark-100 hover:text-dark-900 active:scale-95',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-red active:scale-95',
  gold: 'bg-accent-gold hover:bg-accent-gold/90 text-dark shadow-gold active:scale-95',
  glass: 'bg-glass-white backdrop-blur-md border border-white/20 text-white hover:bg-glass-white/80 active:scale-95',
};

const sizes = {
  xs: 'px-3 py-1.5 text-xs font-medium',
  sm: 'px-4 py-2 text-sm font-medium',
  md: 'px-6 py-2.5 text-base font-semibold',
  lg: 'px-8 py-3 text-lg font-semibold',
  xl: 'px-10 py-4 text-xl font-bold',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      loading = false,
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      rounded = 'lg',
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2',
      'transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      `rounded-${rounded}`,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
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
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && <Icon className="h-5 w-5" />}
            <span>{children}</span>
            {Icon && iconPosition === 'right' && <Icon className="h-5 w-5" />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
