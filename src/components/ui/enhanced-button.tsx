import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary (gradient) button
        default: "leaf-gradient text-background shadow-lg hover:shadow-xl hover:scale-105 font-semibold border-0 focus-visible:ring-leaf-mint",
        
        // Secondary (outline mint) button
        secondary: "border-2 border-leaf-mint text-leaf-mint bg-transparent shadow-sm hover:bg-leaf-mint hover:text-background hover:scale-105 focus-visible:ring-leaf-mint",
        
        // Tertiary (text link) button
        tertiary: "text-leaf-mint underline-offset-4 hover:underline bg-transparent shadow-none p-0 h-auto font-normal focus-visible:ring-leaf-mint",
        
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-accent",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
        hero: "leaf-gradient text-background shadow-2xl hover:shadow-2xl hover:scale-105 font-semibold border-0 focus-visible:ring-leaf-mint",
        glass: "glass-card text-foreground shadow-xl hover:bg-card/90 hover:scale-105 backdrop-blur-md focus-visible:ring-leaf-mint",
        chip: "rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground text-xs font-medium px-3 py-1 focus-visible:ring-accent",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };