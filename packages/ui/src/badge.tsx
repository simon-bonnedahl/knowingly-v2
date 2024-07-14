import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from ".";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary !text-white hover:bg-primary/80 ",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        successful: "border-green-600 bg-green-200 text-green-600  ",
        pending: "border-yellow-600 bg-yellow-200 text-yellow-600",

        destructive: "border-red-600 bg-red-200 text-red-600",
        outline: "border-primary bg-primary/20 text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
