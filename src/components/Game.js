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
import { doc, setDoc, getDoc } from "firebase/firestore";

const Game = () => {
  const [modalStatus, toggleModalStatus] = useToggle([true, false], 0);
  const [level, setLevel] = useState("medium");
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    signInAnonymously(getAuth()).then((result) => {
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, { uid: user.uid }, { merge: true });
    });
  }, []);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "levels", level);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCharacters(docSnap.data().characters);
      } else {
        console.error("Error fetching doc ", docRef);
      }
    })();
  }, [level]);

  return (
    <GameStateProvider value={{ level }}>
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
