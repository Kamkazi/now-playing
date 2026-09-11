import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
        player:
          "rounded-full border border-border bg-gradient-to-b from-secondary to-[color-mix(in_oklab,var(--secondary)_70%,var(--overlay))] text-secondary-foreground shadow-tactile transition-[transform,box-shadow,background-color] hover:brightness-110 active:translate-y-[3px] active:shadow-inset active:brightness-95",
        active:
          "rounded-full border border-primary bg-primary text-primary-foreground shadow-inset transition-[transform,box-shadow] active:translate-y-[2px]",
        primaryDial:
          "rounded-full border border-[color-mix(in_oklab,var(--primary)_60%,var(--overlay))] bg-gradient-to-b from-[color-mix(in_oklab,var(--primary)_88%,white)] to-primary text-primary-foreground shadow-tactile transition-[transform,box-shadow,filter] hover:brightness-110 active:translate-y-[3px] active:shadow-inset active:brightness-95",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        control: "h-14 w-14 rounded-full p-0 [&_svg]:size-6",
        dial: "h-16 w-16 rounded-full p-0 [&_svg]:size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onPointerDown, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
      // Tactile feedback: iPhone build maps this to UIImpactFeedbackGenerator.
      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(8);
      }
      onPointerDown?.(event);
    };
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onPointerDown={handlePointerDown}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
