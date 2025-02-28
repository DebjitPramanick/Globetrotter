import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./index.styled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const Button = ({
  children,
  size = "medium",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton size={size} fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
