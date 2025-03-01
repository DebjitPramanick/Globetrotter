import { useState, FormEvent } from "react";
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
import { useRouter } from "next/router";
import { userApi } from "@/api";
import { useRequestState } from "@/hooks";
import { ApiError, RequestError } from "@/types/error";
import { useApp } from "@/context/AppContext";

const Welcome = () => {
  const router = useRouter();
  const { setUsername: setUsernameInContext, setUser } = useApp();

  const [username, setUsername] = useState("");

  const [submitRequestState, submitRequestStateHandler] = useRequestState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      try {
        submitRequestStateHandler.pending();
        const response = await userApi.auth({
          username: username.trim(),
        });
        submitRequestStateHandler.fulfilled(response.data);
        setUser(response.data);
        setUsernameInContext(response.data.username);
        router.push("/game");
      } catch (error) {
        submitRequestStateHandler.rejected(new RequestError(error));
      }
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
            disabled={submitRequestState.isPending}
          />
          <Button
            type="submit"
            disabled={!username.trim() || submitRequestState.isPending}
            fullWidth
          >
            {submitRequestState.isPending ? "Loading..." : "Start Game"}
          </Button>
        </Form>
        {submitRequestState.isRejected && (
          <div className="error-message">
            {submitRequestState.error?.message || "An error occurred"}
          </div>
        )}
      </ContentWrapper>
      <Credit />
    </WelcomeContainer>
  );
};

export default Welcome;
