import React from "react";
import GameHeader from "./GameHeader";
import { CharactersProvider } from "../context/Characters";

const Game = () => {
  return (
    <CharactersProvider>
      <div></div>
    </CharactersProvider>
  );
};

export default Game;
