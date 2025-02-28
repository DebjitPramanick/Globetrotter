import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameContainer, Title, Username } from "./index.styled";

const Game = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  if (!username) return null;

  return (
    <GameContainer>
      <Title>
        Welcome, <Username>{username}</Username>!
      </Title>
      {/* Add your game components here */}
    </GameContainer>
  );
};

export default Game;
