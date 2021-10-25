import React, { useContext } from "react";
import styled from "styled-components";
import GameDataContext from "../context/GameData";
import GameStateContext from "../context/GameState";
import CharacterCard from "./CharacterCard";
import ScoreCard from "./ScoreCard.js";

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
  height: 90vh;
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
  justify-content: space-evenly;

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

const ScoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const ModalMenu = ({ isOpen, toggleIsOpen }) => {
  const { characters, scores } = useContext(GameDataContext);
  const { level, setLevel, mode, toggleMode, startGameHandler } =
    useContext(GameStateContext);

  return (
    <>
      {isOpen && (
        <>
          <StyledModal>
            <NavWrap>
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
            </NavWrap>
            {mode === "play" && (
              <CharacterWrap>
                {characters.map((char, i) => (
                  <CharacterCard {...char} key={i} />
                ))}
              </CharacterWrap>
            )}
            {mode === "scores" && (
              <ScoreWrap>
                Scooooores !!
                {scores
                  .sort(() => 0)
                  .slice(0, 10)
                  .map((score, i) => (
                    <ScoreCard {...{ score, i }} />
                  ))}
              </ScoreWrap>
            )}
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

export default ModalMenu;
