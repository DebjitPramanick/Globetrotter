import { ErrorContainer } from "./index.styled";

interface ErrorProps {
  message?: string;
}

const Error = ({ message = "Something went wrong" }: ErrorProps) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default Error;
