import { ButtonHTMLAttributes } from "react";
import { StyledIconButton } from "./index.styled";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <StyledIconButton {...props}>{children}</StyledIconButton>;
};

export default IconButton;
