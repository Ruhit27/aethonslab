import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost" | "secondary";
type ButtonSize = "sm" | "default" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-primary text-primary-foreground shadow-[0_16px_40px_rgba(215,255,107,.18)] hover:bg-primary/90",
  outline:
    "border border-white/12 bg-white/4 text-foreground hover:bg-white/8",
  ghost: "text-foreground hover:bg-white/8",
  secondary: "bg-white/8 text-foreground hover:bg-white/12",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 rounded-full px-3 text-sm",
  default: "h-11 rounded-full px-4 text-sm",
  lg: "h-12 rounded-full px-6 text-sm md:text-base",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant = "default", size = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as never}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };