import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-white hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        completed: "bg-[#5CB338] border-none text-white",
        INACTIVE: "bg-gray-400 border-none text-white",
        ACTIVE:
          "border-transparent bg-primary text-white shadow hover:bg-primary/80",
        processing: "bg-[#ECE852] border-none text-black",
        PENDING: "bg-[#FFD700] border-none text-black",
        WARNING: "bg-[#FB4141] border-none text-white",
        return: "bg-[#4A90E2] border-none text-white",
        request: "bg-[#9B51E0] border-none text-white",
        shipping: "bg-[#00B8A9] border-none text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({
  className,
  variant,
  status,
  ...props
}: BadgeProps & {
  status?: "ACTIVE" | "onHold" | "INACTIVE" | "PENDING" | "paid" | "WARNING";
}) {
  const computedVariant =
    status === "ACTIVE"
      ? "default" // Đang học hoặc chờ xử lý
      : status === "onHold" || status === "paid" || status === "WARNING"
      ? "secondary" // Đang bảo lưu hoặc đã thanh toán
      : status === "INACTIVE"
      ? "INACTIVE" // Hết hạn bảo lưu
      : status === "PENDING"
      ? "PENDING" // Đang nợ
      : variant;

  return (
    <div
      className={cn(badgeVariants({ variant: computedVariant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
