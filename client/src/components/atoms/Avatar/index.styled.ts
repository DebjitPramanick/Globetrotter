import styled from "styled-components";

export const AvatarContainer = styled.div<{
  size?: "small" | "medium" | "large";
}>`
  width: ${({ size = "medium" }) => {
    switch (size) {
      case "small":
        return "32px";
      case "large":
        return "48px";
      default:
        return "40px";
    }
  }};
  height: ${({ size = "medium" }) => {
    switch (size) {
      case "small":
        return "32px";
      case "large":
        return "48px";
      default:
        return "40px";
    }
  }};
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-size: ${({ size = "medium" }) => {
    switch (size) {
      case "small":
        return "14px";
      case "large":
        return "20px";
      default:
        return "16px";
    }
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
