import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Credit, Logo } from "@/components/atoms";
import { FloatingElements } from "@/components/molecules";
import {
  WelcomeContainer,
  ContentWrapper,
  Title,
  Subtitle,
  Form,
  Input,
} from "./index.styled";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // You can store the username in context or local storage if needed
      localStorage.setItem("username", username.trim());
      navigate("/game");
    }
  };

  return (
    <WelcomeContainer>
      <FloatingElements />
      <ContentWrapper>
        <Logo />
        <Title>Welcome to the Game</Title>
        <Subtitle>Enter your username to start the adventure</Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={15}
            required
          />
          <Button
            type="submit"
            disabled={!username.trim()}
            size="large"
            fullWidth
          >
            Start Game
          </Button>
        </Form>
      </ContentWrapper>
      <Credit />
    </WelcomeContainer>
  );
};

export default Welcome;
