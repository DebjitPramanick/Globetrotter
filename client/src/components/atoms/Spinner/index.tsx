import { SpinnerContainer, SpinnerCircle } from "./index.styled";

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const Spinner = ({ size = 24, color, thickness = 2 }: SpinnerProps) => {
  return (
    <SpinnerContainer>
      <SpinnerCircle size={size} color={color} thickness={thickness} />
    </SpinnerContainer>
  );
};

export default Spinner;
