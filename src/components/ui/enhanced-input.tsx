import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helper, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    
    const handleFocus = () => setFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
    };
    
    React.useEffect(() => {
      setHasValue(props.value?.toString().length > 0 || props.defaultValue?.toString().length > 0);
    }, [props.value, props.defaultValue]);

    if (label) {
      return (
        <div className="space-y-2">
          <div className="relative">
            <input
              type={type}
              className={cn(
                "flex h-12 w-full rounded-xl border border-input bg-background px-4 pt-6 pb-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
                error && "border-destructive focus-visible:ring-destructive",
                className
              )}
              ref={ref}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
            <label
              className={cn(
                "absolute left-4 text-sm text-muted-foreground transition-all duration-200 pointer-events-none",
                (focused || hasValue) 
                  ? "top-2 text-xs text-foreground" 
                  : "top-1/2 -translate-y-1/2",
                error && "text-destructive"
              )}
            >
              {label}
            </label>
          </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
          {helper && !error && (
            <p className="text-xs text-muted-foreground">{helper}</p>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };