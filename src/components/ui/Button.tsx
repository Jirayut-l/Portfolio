"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-radius-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground",
      ghost: "bg-transparent hover:bg-secondary hover:text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      success: "bg-success text-success-foreground hover:bg-success/90",
    };

    const sizes = {
      sm: "h-8 px-spacing-sm text-xs",
      md: "h-10 px-spacing-md py-spacing-sm",
      lg: "h-12 px-spacing-xl text-lg",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(props.children)) {
      const child = props.children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        ...props,
        className: `${combinedClassName} ${child.props.className || ""}`,
      } as React.Attributes & { className?: string });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
