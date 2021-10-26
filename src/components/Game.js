import React, { useEffect, useState } from "react";
import GameHeader from "./GameHeader";
import ModalMenu from "./ModalMenu";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import EndGameModal from "./EndGameModal";
import gameImg from "../assets/the-loc-nar-level.jpg";
import { GameDataProvider } from "../context/GameData";
import { GameStateProvider } from "../context/GameState";
import { useToggle, useBoolToggle, useTimer } from "../hooks";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import { app, db } from "../firebase-setup";
import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const Game = () => {
  // TODO remove before publish //console.log//
  window.signOut = () => signOut(getAuth());
  //
  const [isModalOpen, toggleIsModalOpen] = useBoolToggle(true);
  const [isInfoOpen, toggleIsInfoOpen] = useBoolToggle(false);
  const [infoText, setInfoText] = useState("");
  const [isTaggingOpen, toggleIsTaggingOpen] = useBoolToggle(false);
  const [level, setLevel] = useState("easy");
  const [mode, toggleMode] = useToggle(["play", "scores"], 0);
  const [characters, setCharacters] = useState([]);
  const [scores, setScores] = useState([]);
  const [relativePos, setRelativePos] = useState({});
  const [timer, startTimer] = useTimer(66);
  const [isEndGameModalOpen, toggleIsEndGameModalOpen] = useBoolToggle(false);

  const [user, setUser] = useState();
  const [userDocRef, setUserDocRef] = useState();

  useEffect(() => {
    signInAnonymously(getAuth()).then((result) => {
      setUser(result.user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    setUserDocRef(doc(db, "users", user.uid));
  }, [user]);

  useEffect(() => {
    if (!user || !userDocRef) return;
    setDoc(userDocRef, { uid: user.uid }, { merge: true });
  }, [user, userDocRef]);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "levels", level);
      const docSnap = await getDoc(docRef);

      if (mode === "play") {
        const chars = docSnap
          .data()
          .characters.map((char) => ({ ...char, found: false }));
        setCharacters(chars);
      }
      if (mode === "scores") setScores(docSnap.data().scores);
    })();
  }, [level, mode]);

  const startGameHandler = () => {
    toggleIsModalOpen(false);
    const startTime = Timestamp.now().toMillis();
    startTimer(startTime);
    updateDoc(userDocRef, { start: startTime });
  };

  const handleEnd = async () => {
    const end = Timestamp.now().toMillis();
    toggleIsEndGameModalOpen(true);
    startTimer(false);
    updateDoc(userDocRef, { end: end });
  };

  const updateScores = async () => {
    const snapshot = await getDoc(userDocRef);
    const newScore = snapshot.data();
    const docRef = doc(db, "levels", level);
    await updateDoc(docRef, {
      scores: arrayUnion(newScore),
    });
    toggleMode("scores");
    toggleIsEndGameModalOpen(false);
    toggleIsModalOpen(true);
  };

  const handleFound = (charName) => {
    if (characters.filter((char) => !char.found).length <= 1) handleEnd();
    else {
      const charIndex = characters.findIndex((char) => char.name === charName);
      const newChars = [
        ...characters.slice(0, charIndex),
        { ...characters[charIndex], found: true },
        ...characters.slice(charIndex + 1),
      ];

      setCharacters(newChars);
    }
  };

  const selectionHandler = async (e) => {
    toggleIsTaggingOpen();
    const charName = e.target.textContent;

    const docRef = doc(db, "solutions", charName);
    const docSnap = await getDoc(docRef);

    const diffX = relativePos.x - docSnap.data().x;
    const diffY = relativePos.y - docSnap.data().y;

    let text;
    if (diffX < 100 && diffX > -100 && diffY < 100 && diffY > -100) {
      text = `Good job! You have found ${charName}!`;
      handleFound(charName);
    } else {
      text = `This was not ${charName}!`;
    }
    setInfoText(text);
  };

  useEffect(() => {
    if (!infoText) return;
    toggleIsInfoOpen(true);
    const timer = window.setTimeout(() => {
      toggleIsInfoOpen(false);
      setInfoText("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [infoText]);

  return (
    <GameStateProvider
      value={{ level, setLevel, mode, toggleMode, startGameHandler }}>
      <GameDataProvider value={{ characters, scores }}>
        <GameHeader {...{ timer }} />
        <GameInfo {...{ doOpen: isInfoOpen, infoText }} />
        <ModalMenu isOpen={isModalOpen} toggleIsOpen={toggleIsModalOpen} />
        <GameArea
          {...{
            selectionHandler,
            imageSrc: gameImg,
            isTaggingOpen,
            toggleIsTaggingOpen,
            setRelativePos,
          }}
        />
        {isEndGameModalOpen && <EndGameModal {...{ updateScores }} />}
      </GameDataProvider>
    </GameStateProvider>
  );
};

export default Game;
