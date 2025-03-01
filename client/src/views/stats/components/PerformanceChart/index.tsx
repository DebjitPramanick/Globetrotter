import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { useTheme } from "styled-components";
import { Container, Title, ChartContainer, ChartGrid } from "./index.styled";

interface ChartData {
  name: string;
  correct: number;
  wrong: number;
}

interface PerformanceChartProps {
  totalCorrectAnswersWithFirstClue: number;
  totalWrongAnswersWithFirstClue: number;
  totalCorrectAnswersWithMultipleClues: number;
  totalWrongAnswersWithMultipleClues: number;
}

const PerformanceChart = ({
  totalCorrectAnswersWithFirstClue,
  totalWrongAnswersWithFirstClue,
  totalCorrectAnswersWithMultipleClues,
  totalWrongAnswersWithMultipleClues,
}: PerformanceChartProps) => {
  const theme = useTheme();

  const data: ChartData[] = [
    {
      name: "First Clue",
      correct: totalCorrectAnswersWithFirstClue,
      wrong: totalWrongAnswersWithFirstClue,
    },
    {
      name: "Multiple Clues",
      correct: totalCorrectAnswersWithMultipleClues,
      wrong: totalWrongAnswersWithMultipleClues,
    },
  ];

  return (
    <ChartGrid>
      <Container>
        <Title>Performance Analysis</Title>
        <ChartContainer>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 4 }}
            >
              <XAxis
                dataKey="name"
                stroke={theme.colors.text}
                tick={{ fill: theme.colors.text }}
                tickMargin={24}
              />
              <YAxis
                stroke={theme.colors.text}
                tick={{ fill: theme.colors.text }}
                axisLine={false}
                tickMargin={24}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.medium,
                  color: theme.colors.text,
                }}
              />
              <Legend
                wrapperStyle={{
                  color: theme.colors.text,
                  paddingTop: theme.spacing.xl,
                }}
                verticalAlign="bottom"
                iconType="circle"
              />
              <Bar
                dataKey="correct"
                name="Correct Answers"
                fill={theme.colors.success}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="wrong"
                name="Wrong Answers"
                fill={theme.colors.error}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Container>
      {/* Add more charts here */}
    </ChartGrid>
  );
};

export default PerformanceChart;
