import {
  ProgressWrapper,
  ProgressBar,
  ProgressFill,
  Score,
} from "./index.styled";

interface ProgressProps {
  current: number;
  total: number;
  score: number;
}

const Progress = ({ current, total, score }: ProgressProps) => {
  const progress = (current / total) * 100;

  return (
    <ProgressWrapper>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      <Score>{score}</Score>
    </ProgressWrapper>
  );
};

export default Progress;
