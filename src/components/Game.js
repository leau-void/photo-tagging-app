import React from "react";
import GameHeader from "./GameHeader";
import ModalStartGame from "./ModalStartGame";
import GameArea from "./GameArea";
import gameImg from "../assets/the-loc-nar-level.jpg";
import { CharactersProvider } from "../context/Characters";
import { useToggle } from "../hooks";

const Game = () => {
  const [modalStatus, toggleModalStatus] = useToggle([true, false], 1);
  return (
    <CharactersProvider value={{}}>
      <GameHeader />
      <ModalStartGame isOpen={modalStatus} toggleIsOpen={toggleModalStatus} />
      <GameArea imageSrc={gameImg} />
    </CharactersProvider>
  );
};

export default Game;
