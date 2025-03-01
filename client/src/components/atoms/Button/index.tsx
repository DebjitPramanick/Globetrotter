import { ButtonHTMLAttributes } from "react";
import { StyledButton } from "./index.styled";
import { Spinner } from "@/components/atoms";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = ({
  children,
  size = "medium",
  variant = "primary",
  fullWidth = false,
  loading = false,
  loadingText = "Loading...",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={16} color="currentColor" />
          <span style={{ marginLeft: 8 }}>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default Button;
