import { Button as BaseButton } from "@/components/ui/Button";
import { FC } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  color?: "default" | "outline" | "secondary" | "destructive";
  onClick?: () => void;
  children: React.ReactNode;
};

export const Button: FC<Props> = ({
  type = "button",
  color,
  onClick,
  children,
}) => {
  return (
    <BaseButton type={type} variant={color} onClick={onClick}>
      {children}
    </BaseButton>
  );
};
