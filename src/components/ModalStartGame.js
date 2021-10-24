import React, { useContext } from "react";
import styled from "styled-components";
import CharactersContext from "../context/Characters";
import GameStateContext from "../context/GameState";

const StyledModal = styled.div`
  width: 80vw;
  height: 80vh;
  position: fixed;
  z-index: 110;
  color: white;
  background: #362222;
  border-radius: 4px;
  top: 8vh;
  left: 10vw;
`;

const Level = styled.h2``;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 109;
  background: rgba(43, 43, 43, 0.7);
`;

const ModalStartGame = ({ isOpen, toggleIsOpen }) => {
  const characters = useContext(CharactersContext);
  const gameState = useContext(GameStateContext);
  return (
    <>
      {isOpen && (
        <>
          <StyledModal>
            <Level>Level : {gameState.level}</Level>
            {characters.map((char, i) => (
              <div key={i}>{char.name}</div>
            ))}
          </StyledModal>
          <ModalBg />
        </>
      )}
    </>
  );
};

export default ModalStartGame;
