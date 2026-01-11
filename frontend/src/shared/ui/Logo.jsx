const Logo = ({ size = 40, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size * 0.5} 
      viewBox="0 0 80 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left lens */}
      <ellipse 
        cx="20" 
        cy="20" 
        rx="16" 
        ry="14" 
        stroke="url(#goldGradient)" 
        strokeWidth="2.5"
        fill="none"
      />
      {/* Right lens */}
      <ellipse 
        cx="60" 
        cy="20" 
        rx="16" 
        ry="14" 
        stroke="url(#goldGradient)" 
        strokeWidth="2.5"
        fill="none"
      />
      {/* Bridge */}
      <path 
        d="M36 20 Q40 16 44 20" 
        stroke="url(#goldGradient)" 
        strokeWidth="2.5" 
        fill="none"
        strokeLinecap="round"
      />
      {/* Left temple */}
      <path 
        d="M4 20 L4 14" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Right temple */}
      <path 
        d="M76 20 L76 14" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      {/* Lens shine effect - left */}
      <ellipse 
        cx="14" 
        cy="16" 
        rx="4" 
        ry="3" 
        fill="url(#shineGradient)"
        opacity="0.3"
      />
      {/* Lens shine effect - right */}
      <ellipse 
        cx="54" 
        cy="16" 
        rx="4" 
        ry="3" 
        fill="url(#shineGradient)"
        opacity="0.3"
      />
      
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
        <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
