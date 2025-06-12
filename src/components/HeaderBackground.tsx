export function HeaderBackground() {
  return (
    <div className="header-background">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="header-waves"
      >
        <path 
          d="M0,50 C30,60 70,40 100,50 L100,100 L0,100 Z" 
          className="wave wave-1"
        />
        <path 
          d="M0,50 C40,70 60,30 100,50 L100,100 L0,100 Z" 
          className="wave wave-2"
        />
        <path 
          d="M0,50 C50,80 50,20 100,50 L100,100 L0,100 Z" 
          className="wave wave-3"
        />
      </svg>
      <div className="header-dots" />
    </div>
  );
}
