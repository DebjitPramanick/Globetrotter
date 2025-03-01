import { useState, FormEvent } from "react";
import { Button, Credit, Logo, Spinner } from "@/components/atoms";
import { FloatingElements } from "@/components/molecules";
import {
  WelcomeContainer,
  ContentWrapper,
  Title,
  Subtitle,
  Form,
  Input,
  GuestLink,
  OrDivider,
} from "./index.styled";
import { useRouter } from "next/router";
import { userApi } from "@/api";
import { useRequestState } from "@/hooks";
import { RequestError } from "@/types/error";
import { useApp } from "@/context/AppContext";
import { showErrorToast } from "@/utils/notifications";
import { extractErrorMessage } from "@/utils/error";
import { useTheme } from "styled-components";

const WelcomePageView = () => {
  const router = useRouter();
  const { setUser, createAnonymousUser } = useApp();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [submitRequestStates, submitRequestStatesHandler] = useRequestState();
  const [guestRequestStates, guestRequestStatesHandler] = useRequestState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      try {
        submitRequestStatesHandler.pending();
        const response = await userApi.auth({
          username: username.trim(),
        });
        submitRequestStatesHandler.fulfilled(response.data);
        setUser(response.data);
        router.push("/");
      } catch (error) {
        const errorMessage = extractErrorMessage(error);
        submitRequestStatesHandler.rejected(new RequestError(errorMessage));
        showErrorToast(errorMessage);
      }
    }
  };

  const handleGuestPlay = async () => {
    try {
      guestRequestStatesHandler.pending();
      const anonymousUser = await createAnonymousUser();
      guestRequestStatesHandler.fulfilled(anonymousUser);
      if (anonymousUser) {
        router.push("/");
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      guestRequestStatesHandler.rejected(new RequestError(errorMessage));
      showErrorToast(errorMessage);
    }
  };

  return (
    <WelcomeContainer>
      <FloatingElements />
      <ContentWrapper>
        <Logo />
        <Title>Welcome to the Game</Title>
        <Subtitle>
          Enter your username to start the adventure and challenge your friends
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={15}
            required
            disabled={submitRequestStates.isPending}
          />
          <Button
            type="submit"
            disabled={!username.trim() || submitRequestStates.isPending}
            fullWidth
          >
            {submitRequestStates.isPending ? "Loading..." : "Start Game"}
          </Button>
        </Form>
        <OrDivider>or</OrDivider>
        {guestRequestStates.isPending ? (
          <Spinner />
        ) : (
          <GuestLink onClick={handleGuestPlay}>Play as Guest</GuestLink>
        )}
      </ContentWrapper>
      <Credit style={{ marginTop: theme.spacing.lg }} />
    </WelcomeContainer>
  );
};

export default WelcomePageView;
