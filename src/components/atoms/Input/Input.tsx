import * as React from "react";
import { Input as InputBase } from "@/components/ui/Input";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  align?: "left" | "center" | "right";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, align, ...props }, ref) => {
    return (
      <InputBase
        type={type}
        align={align}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
