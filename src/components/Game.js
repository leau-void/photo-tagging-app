import React, { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import ModalStartGame from "./ModalStartGame";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import gameImg from "../assets/the-loc-nar-level.jpg";
import { GameDataProvider } from "../context/GameData";
import { GameStateProvider } from "../context/GameState";
import { useToggle } from "../hooks";
import { getAuth, signInAnonymously } from "firebase/auth";
import { app, db } from "../firebase-setup";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Game = () => {
  const [modalStatus, toggleModalStatus] = useToggle([true, false], 0);
  const [level, setLevel] = useState("easy");
  const [mode, toggleMode] = useToggle(["play", "scores"], 0);
  const [characters, setCharacters] = useState([]);
  const [scores, setScores] = useState([]);

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
        if (mode === "play") setCharacters(docSnap.data().characters);
        if (mode === "scores") setScores(docSnap.data().scores);
      } else {
        console.error("Error fetching doc ", docRef);
      }
    })();
  }, [level, mode]);

  const startGameHandler = () => {};

  return (
    <GameStateProvider
      value={{ level, setLevel, mode, toggleMode, startGameHandler }}>
      <GameDataProvider value={{ characters, scores }}>
        <GameHeader />
        <GameInfo />
        <ModalStartGame isOpen={modalStatus} toggleIsOpen={toggleModalStatus} />
        <GameArea imageSrc={gameImg} />
      </GameDataProvider>
    </GameStateProvider>
  );
};

export default Game;
