import { cn } from "@/lib/utils";

interface LeafLogoProps {
  variant?: "side" | "stacked";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LeafLogo = ({ variant = "side", size = "md", className }: LeafLogoProps) => {
  const sizeClasses = {
    sm: variant === "side" ? "h-8" : "h-12",
    md: variant === "side" ? "h-12" : "h-16", 
    lg: variant === "side" ? "h-16" : "h-24"
  };

  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <LeafIcon size={size} />
        <LeafWordmark size={size} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LeafIcon size={size} />
      <LeafWordmark size={size} />
    </div>
  );
};

const LeafIcon = ({ size }: { size: string }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className={cn("relative", sizeClasses[size as keyof typeof sizeClasses])}>
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--leaf-green-1))" />
            <stop offset="100%" stopColor="hsl(var(--leaf-teal-1))" />
          </linearGradient>
        </defs>
        
        {/* Main leaf shield shape */}
        <path
          d="M20 20 Q20 15 25 15 L50 15 Q75 15 75 40 Q75 65 50 85 Q25 65 25 40 L25 25 Q25 20 20 20 Z"
          fill="url(#leafGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Inner concentric shapes */}
        <path
          d="M30 25 Q30 22 33 22 L50 22 Q67 22 67 39 Q67 56 50 70 Q33 56 33 39 L33 28 Q33 25 30 25 Z"
          fill="none"
          stroke="hsl(var(--bg-deep))"
          strokeWidth="3"
          opacity="0.7"
        />
        
        <path
          d="M40 30 Q40 28 42 28 L50 28 Q58 28 58 36 Q58 44 50 52 Q42 44 42 36 L42 32 Q42 30 40 30 Z"
          fill="none"
          stroke="hsl(var(--bg-deep))"
          strokeWidth="2.5"
          opacity="0.5"
        />
        
        {/* Bottom stem elements */}
        <rect x="20" y="72" width="6" height="12" rx="3" fill="url(#leafGradient)" />
        <rect x="30" y="75" width="6" height="9" rx="3" fill="url(#leafGradient)" />
      </svg>
    </div>
  );
};

const LeafWordmark = ({ size }: { size: string }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl", 
    lg: "text-4xl"
  };

  return (
    <div className={cn("font-display font-semibold tracking-tight", sizeClasses[size as keyof typeof sizeClasses])}>
      <span className="text-foreground">leaf</span>
      <span className="text-leaf-mint">.</span>
      <span className="text-text-mid">io</span>
    </div>
  );
};