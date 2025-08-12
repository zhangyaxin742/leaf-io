import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        selected: "border-2 border-leaf-mint bg-leaf-mint/20 text-leaf-mint hover:bg-leaf-mint/30",
        outline: "border border-border bg-transparent hover:bg-accent hover:text-accent-foreground",
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-7 px-3 py-1",
        sm: "h-6 px-2 text-xs",
        lg: "h-8 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, selected, ...props }, ref) => {
    const effectiveVariant = selected ? "selected" : variant;
    
    return (
      <button
        className={cn(chipVariants({ variant: effectiveVariant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Chip.displayName = "Chip";

export { Chip, chipVariants };