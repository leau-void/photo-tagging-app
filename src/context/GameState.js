import React from "react";

const GameStateContext = React.createContext([]);

export const GameStateProvider = GameStateContext.Provider;

export default GameStateContext;
