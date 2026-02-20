interface TechLinesProps {
  variant: "corner-brackets" | "circuit-trace" | "scan-rule" | "bracket-pair";
  className?: string;
}

function CornerBrackets({ className = "" }: { className?: string }) {
  const size = 24;
  const stroke = 1.5;
  return (
    <>
      {/* Top-left */}
      <svg
        className={`pointer-events-none absolute top-3 left-3 ${className}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={`M0 ${size}V0H${size}`} stroke="currentColor" strokeWidth={stroke} />
      </svg>
      {/* Top-right */}
      <svg
        className={`pointer-events-none absolute top-3 right-3 ${className}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={`M${size} ${size}V0H0`} stroke="currentColor" strokeWidth={stroke} />
      </svg>
      {/* Bottom-left */}
      <svg
        className={`pointer-events-none absolute bottom-3 left-3 ${className}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={`M0 0V${size}H${size}`} stroke="currentColor" strokeWidth={stroke} />
      </svg>
      {/* Bottom-right */}
      <svg
        className={`pointer-events-none absolute bottom-3 right-3 ${className}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={`M${size} 0V${size}H0`} stroke="currentColor" strokeWidth={stroke} />
      </svg>
    </>
  );
}

function CircuitTrace({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute top-0 left-0 w-full ${className}`}
      height="20"
      viewBox="0 0 1200 20"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="400" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="400" y1="10" x2="400" y2="3" stroke="currentColor" strokeWidth="1" />
      <line x1="400" y1="3" x2="500" y2="3" stroke="currentColor" strokeWidth="1" />
      <circle cx="500" cy="3" r="2.5" fill="currentColor" />
      <line x1="500" y1="3" x2="600" y2="3" stroke="currentColor" strokeWidth="1" />
      <line x1="600" y1="3" x2="600" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="600" y1="10" x2="800" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="800" y1="10" x2="800" y2="17" stroke="currentColor" strokeWidth="1" />
      <line x1="800" y1="17" x2="900" y2="17" stroke="currentColor" strokeWidth="1" />
      <circle cx="900" cy="17" r="2.5" fill="currentColor" />
      <line x1="900" y1="17" x2="1000" y2="17" stroke="currentColor" strokeWidth="1" />
      <line x1="1000" y1="17" x2="1000" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="1000" y1="10" x2="1200" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function ScanRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-current opacity-20" />
      <div className="h-1.5 w-1.5 rounded-full bg-current" />
      <div className="h-px flex-1 bg-current opacity-20" />
    </div>
  );
}

function BracketPair({ className = "" }: { className?: string }) {
  const height = 80;
  const stroke = 1.5;
  return (
    <>
      {/* Left bracket */}
      <svg
        className={`pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 ${className}`}
        width="12"
        height={height}
        viewBox={`0 0 12 ${height}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={`M12 0H0V${height}H12`} stroke="currentColor" strokeWidth={stroke} />
      </svg>
      {/* Right bracket */}
      <svg
        className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 ${className}`}
        width="12"
        height={height}
        viewBox={`0 0 12 ${height}`}
        fill="none"
        aria-hidden="true"
      >
        <path d={`M0 0H12V${height}H0`} stroke="currentColor" strokeWidth={stroke} />
      </svg>
    </>
  );
}

export default function TechLines({ variant, className = "" }: TechLinesProps) {
  switch (variant) {
    case "corner-brackets":
      return <CornerBrackets className={className} />;
    case "circuit-trace":
      return <CircuitTrace className={className} />;
    case "scan-rule":
      return <ScanRule className={className} />;
    case "bracket-pair":
      return <BracketPair className={className} />;
  }
}
