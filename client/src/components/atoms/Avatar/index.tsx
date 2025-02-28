import { AvatarContainer } from "./index.styled";

interface AvatarProps {
  name: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const Avatar = ({ name, size = "medium", onClick }: AvatarProps) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <AvatarContainer size={size} onClick={onClick}>
      {initial}
    </AvatarContainer>
  );
};

export default Avatar;
