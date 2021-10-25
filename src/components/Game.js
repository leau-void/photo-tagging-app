import React, { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import ModalMenu from "./ModalMenu";
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
  const [isInfoOpen, toggleIsInfoOpen] = useToggle([false, true], 0);
  const [isTaggingOpen, toggleIsTaggingOpen] = useToggle([false, true], 0);
  const [level, setLevel] = useState("easy");
  const [mode, toggleMode] = useToggle(["play", "scores"], 0);
  const [characters, setCharacters] = useState([]);
  const [scores, setScores] = useState([]);
  const [relativePos, setRelativePos] = useState({});

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

      if (mode === "play") setCharacters(docSnap.data().characters);
      if (mode === "scores") setScores(docSnap.data().scores);
    })();
  }, [level, mode]);

  const startGameHandler = () => {
    toggleModalStatus();
  };

  const selectionHandler = async (e) => {
    toggleIsTaggingOpen();

    const docRef = doc(db, "solutions", e.target.textContent);
    const docSnap = await getDoc(docRef);

    console.log("docSnap", docSnap.data());
    console.log({ relativePos });

    const diffX = relativePos.x - docSnap.data().x;
    const diffY = relativePos.y - docSnap.data().y;
    console.log({ diffX, diffY });

    if (diffX < 100 && diffX > -100 && diffY < 100 && diffY > -100)
      console.log("found");
    else console.log("no");
  };

  return (
    <GameStateProvider
      value={{ level, setLevel, mode, toggleMode, startGameHandler }}>
      <GameDataProvider value={{ characters, scores }}>
        <GameHeader />
        <GameInfo {...{ doOpen: isInfoOpen }} />
        <ModalMenu isOpen={modalStatus} toggleIsOpen={toggleModalStatus} />
        <GameArea
          {...{
            selectionHandler,
            imageSrc: gameImg,
            isTaggingOpen,
            toggleIsTaggingOpen,
            setRelativePos,
          }}
        />
      </GameDataProvider>
    </GameStateProvider>
  );
};

export default Game;
