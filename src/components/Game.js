import React, { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import ModalStartGame from "./ModalStartGame";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import gameImg from "../assets/the-loc-nar-level.jpg";
import { CharactersProvider } from "../context/Characters";
import { GameStateProvider } from "../context/GameState";
import { useToggle } from "../hooks";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, db } from "../firebase-setup";
import { doc, setDoc, collection, query, getDocs } from "firebase/firestore";

const Game = () => {
  const [modalStatus, toggleModalStatus] = useToggle([true, false], 0);
  const [level, setLevel] = useState("easy");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    signInAnonymously(getAuth());
  }, []);

  useEffect(() => {
    (async () => {
      const charactersDB = [];

      const docRef = doc(db, "levels", level);
      const queryCharacters = query(collection(docRef, "characters"));

      const querySnapshot = await getDocs(queryCharacters);
      querySnapshot.forEach((doc) => {
        charactersDB.push({ name: doc.id, ...doc.data() });
      });
      setCharacters(charactersDB);
      console.log(charactersDB);
    })();
  }, [level]);

  return (
    <GameStateProvider value={{}}>
      <CharactersProvider value={characters}>
        <GameHeader />
        <GameInfo />
        <ModalStartGame isOpen={modalStatus} toggleIsOpen={toggleModalStatus} />
        <GameArea imageSrc={gameImg} />
      </CharactersProvider>
    </GameStateProvider>
  );
};

export default Game;
