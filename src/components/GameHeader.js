import React, { useContext } from "react";
import styled from "styled-components";
import GameDataContext from "../context/GameData";
import CharacterCard from "./CharacterCard";
import { useBoolToggle } from "../hooks";

const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  position: fixed;
  top: 0;
  height: 8vh;
  justify-content: space-around;
  align-items: center;
  background: #171010;
  z-index: 95;
`;

const BorderWrap = styled.div`
  width: 100vw;
  position: fixed;
  top: 0;
  height: calc(8vh + 3px);
  background: #171010;
  z-index: 85;
  border-bottom: 3px solid #e2d0d0;
`;

const MenuWrap = styled.div`
  position: relative;
`;

const CharButton = styled.button`
  font-size: 1.1rem;
  border: 1px solid #e2d0d0;
  color: #e2d0d0;
  background: transparent;
  border-radius: 4px;
  padding: 0.5rem;

  &:hover {
    color: #171010;
    background: #e2d0d0;
  }
`;

const Menu = styled.div`
  position: absolute;
  z-index: 150;
  right: 0;
  padding: 1.5rem;
  width: max-content;
  border-radius: 4px;
  background: #696463;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GameHeader = () => {
  const { characters } = useContext(GameDataContext);
  const [isMenuOpen, toggleIsMenuOpen] = useBoolToggle(false);

  return (
    <>
      <StyledHeader>
        <div>Game Name</div>
        <div>Timer</div>
        <MenuWrap>
          <CharButton onClick={toggleIsMenuOpen}>Characters</CharButton>
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
