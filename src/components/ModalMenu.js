import React, { useContext } from "react";
import styled from "styled-components";
import GameDataContext from "../context/GameData";
import GameStateContext from "../context/GameState";
import CharacterCard from "./CharacterCard";
import ScoreCard from "./ScoreCard.js";
import ModalBg from "./ModalBg";
import quickSort from "../utils/quickSort";
import Button from "./Button";

const StyledModal = styled.div`
  width: 100vw;
  min-height: 65vh;
  max-height: 90vh;
  position: fixed;
  z-index: 150;
  color: #eaeaea;
  font-size: 1.2rem;
  background: #252a34;
  border-radius: 8px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    padding: 2rem 4rem;
    width: 90vw;
    font-size: 1.1rem;
  }
  @media (min-width: 1080px) {
    padding: 2rem 6em;
    width: 60vw;
  }
`;

const CharacterWrap = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
  margin-bottom: auto;
`;

const ScoreWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 90%;
  margin-top: 4rem;
  margin-bottom: auto;
`;

const ScoreHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1fr;
  text-align: center;
  border-bottom: 2px solid #08d9d6;
  padding: 0.5rem 0;
  font-weight: 600;
`;

const NavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ;
`;

const Modes = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-top: 2px solid #ff2e63;
`;

const Tab = styled.button`
  flex-grow: 1;
  background: transparent;
  border: 2px solid #ff2e63;
  border-top: 0;
  color: #eaeaea;
  padding: 0.5rem;
  font-weight: 500;

  &:hover:not(.active) {
    color: #ff2e63;
  }
  &.active {
    background: #ff2e63;
  }
`;

const Mode = styled(Tab)``;

const Levels = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Level = styled(Tab)``;

const CustomButton = styled(Button)`
  margin: 1.5rem 0;
`;

const sortScores = (a, b) => a.end - a.start - (b.end - b.start);

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
                <ScoreHeader>
                  <div>Rank</div>
                  <div>Player name</div>
                  <div>Score</div>
                </ScoreHeader>
                {quickSort(scores, sortScores)
                  .slice(0, 10)
                  .map((score, i) => (
                    <ScoreCard key={i} {...{ score, rank: i + 1 }} />
                  ))}
              </ScoreWrap>
            )}
            {mode === "play" && (
              <CustomButton onClick={startGameHandler}>Start Game</CustomButton>
            )}
          </StyledModal>
          <ModalBg />
        </>
      )}
    </>
  );
};

export default ModalMenu;
export { ModalBg };
