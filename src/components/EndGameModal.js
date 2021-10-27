import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-setup";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import ModalBg from "./ModalBg";
import formatTime from "../utils/formatTime";
import GameStateContext from "../context/GameState";
import Button from "./Button";

const StyledModal = styled.div`
  width: 100vw;
  height: 50vh;
  position: fixed;
  z-index: 150;
  color: #eaeaea;
  font-size: 1.2rem;
  background: #252a34;
  border-radius: 8px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    padding: 2rem 4rem;
    width: 90vw;
    font-size: 1.1rem;
  }
  @media (min-width: 1080px) {
    padding: 2rem 6em;
    width: 60vw;
  }
`;

const Title = styled.h2`
  margin: 0;
`;

const Score = styled.div`
  margin: 1rem 0;
`;

const NameForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
`;

const NameLabel = styled.label`
  text-align: center;
  line-height: 1.7rem;
`;

const NameInput = styled.input`
  padding: 0.5rem;
  background: #c3c9d5;
  color: #252a34;
  border: 0;
  border-left: 0.3rem solid transparent;
  margin-top: 0.5rem;
  width: 100%;

  &:focus {
    border-color: #ff2e63;
  }
`;

const Name = styled.div``;

const EndGameModal = ({ updateScores }) => {
  const [name, setName] = useState();
  const [input, setInput] = useState("");
  const [score, setScore] = useState();
  const { level } = useContext(GameStateContext);

  const user = getAuth().currentUser;
  const docRef = doc(db, "users", user.uid);

  useEffect(() => {
    const listener = onSnapshot(docRef, (docSnap) => {
      const data = docSnap.data();
      if (!data.start || !data.end) return;
      setScore(formatTime(data.end.valueOf() - data.start.valueOf()));
      setName(data.displayName);
    });

    return () => listener();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (!name) updateDoc(docRef, { displayName: input });
    updateScores();
  };

  return (
    <>
      <StyledModal>
        <Title>
          Finished level : <span style={{ color: "#FF2E63" }}>{level}</span>
        </Title>
        <Score>
          Your score: <strong>{score}ms</strong>
        </Score>
        <NameForm onSubmit={handleClick}>
          {!name && (
            <>
              <NameLabel>
                Under what name should your score be listed?
              </NameLabel>
              <NameInput
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </>
          )}
          {name && <Name>{name}</Name>}
          <Button>{name ? "Save score" : "Set name"}</Button>
        </NameForm>
      </StyledModal>
      <ModalBg />
    </>
  );
};

export default EndGameModal;
