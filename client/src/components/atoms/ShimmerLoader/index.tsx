import { ShimmerContainer, ShimmerEffect } from "./index.styled";

interface ShimmerLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const ShimmerLoader = ({
  width = "100%",
  height = "100%",
  borderRadius = "8px",
}: ShimmerLoaderProps) => {
  return (
    <ShimmerContainer
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      <ShimmerEffect />
    </ShimmerContainer>
  );
};

export default ShimmerLoader;
