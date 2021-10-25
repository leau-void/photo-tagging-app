import React, { useContext } from "react";
import styled from "styled-components";
import GameDataContext from "../context/GameData";
import GameStateContext from "../context/GameState";
import CharacterCard from "./CharacterCard";

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 109;
  background: rgba(43, 43, 43, 0.7);
`;

const StyledModal = styled.div`
  max-width: 90vw;
  width: fit-content;
  max-height: 90vh;
  position: fixed;
  z-index: 110;
  color: #171010;
  background: #c4a1a1;
  border-radius: 4px;
  left: 50%;
  top: 5vh;
  transform: translateX(-50%);
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;

  @media (min-width: 768px) {
    padding: 2rem 4rem;
  }
  @media (min-width: 1080px) {
    padding: 2rem 6em;
  }
`;

const CharacterWrap = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Modes = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Tab = styled.button`
  &.active {
    color: red;
  }
`;

const Mode = styled(Tab)``;

const Levels = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Level = styled(Tab)``;

const StartGameButton = styled.button``;

const ModalStartGame = ({ isOpen, toggleIsOpen }) => {
  const { characters, scores } = useContext(GameDataContext);
  const { level, setLevel, mode, toggleMode, startGameHandler } =
    useContext(GameStateContext);

  return (
    <>
      {isOpen && (
        <>
          <StyledModal>
            <Modes>
              <Mode
                onClick={() => toggleMode()}
                className={mode === "play" ? "active" : ""}>
                Play
              </Mode>
              <Mode
                onClick={() => toggleMode()}
                className={mode === "scores" ? "active" : ""}>
                Leaderboard
              </Mode>
            </Modes>
            <Levels>
              <Level
                onClick={() => setLevel("easy")}
                className={level === "easy" ? "active" : ""}>
                Easy
              </Level>
              <Level
                onClick={() => setLevel("medium")}
                className={level === "medium" ? "active" : ""}>
                Medium
              </Level>
              <Level
                onClick={() => setLevel("hard")}
                className={level === "hard" ? "active" : ""}>
                Hard
              </Level>
            </Levels>
            {mode === "play" && (
              <CharacterWrap>
                {characters.map((char, i) => (
                  <CharacterCard {...char} key={i} />
                ))}
              </CharacterWrap>
            )}
            {mode === "scores" && <div>Scooooores !! </div>}
            <StartGameButton onClick={startGameHandler}>
              Start Game
            </StartGameButton>
          </StyledModal>
          <ModalBg />
        </>
      )}
    </>
  );
};

export default ModalStartGame;
