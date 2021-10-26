import React, { useContext } from "react";
import styled from "styled-components";
import GameDataContext from "../context/GameData";
import CharacterCard from "./CharacterCard";
import { useBoolToggle } from "../hooks";
import formatTime from "../utils/formatTime";

const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  position: fixed;
  top: 0;
  height: 8vh;
  justify-content: space-around;
  align-items: center;
  background: #252a34;
  z-index: 95;
`;

const BorderWrap = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  height: calc(8vh + 3px);
  background: #252a34;
  z-index: 85;
  border-bottom: 3px solid #eaeaea;
`;

const Title = styled.h1``;

const Timer = styled.div`
  font-size: 1.2rem;
`;

const MenuWrap = styled.div`
  position: relative;
`;

const CharButton = styled.button`
  font-size: 1.2rem;
  border: 2px solid #08d9d6;
  color: #08d9d6;
  font-weight: bold;
  background: transparent;
  border-radius: 8px;
  padding: 0.5rem;

  &:hover {
    color: #252a34;
    background: #08d9d6;
  }
`;

const Menu = styled.div`
  position: absolute;
  z-index: 150;
  right: 0;
  padding: 1.5rem;
  width: max-content;
  border-radius: 8px;
  background: #3f485a;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #eaeaea;
`;

const GameHeader = ({ timer, showTimer }) => {
  const { characters } = useContext(GameDataContext);
  const [isMenuOpen, toggleIsMenuOpen] = useBoolToggle(false);

  return (
    <>
      <StyledHeader>
        <Title>
          <span style={{ color: "#08D9D6" }}>Friend</span> or{" "}
          <span style={{ color: "#FF2E63" }}>Foe</span>
        </Title>
        <Timer>{showTimer ? formatTime(timer) : ""}</Timer>
        <MenuWrap>
          <CharButton onClick={toggleIsMenuOpen}>
            {characters.filter((char) => !char.found).length}
          </CharButton>
          {isMenuOpen && (
            <Menu>
              {characters.map((char, i) => (
                <CharacterCard header={true} key={i} {...char} />
              ))}
            </Menu>
          )}
        </MenuWrap>
      </StyledHeader>
      <BorderWrap />
    </>
  );
};

export default GameHeader;
