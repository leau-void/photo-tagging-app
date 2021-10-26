import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-setup";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import ModalBg from "./ModalBg";
import formatTime from "../utils/formatTime";

const StyledModal = styled.div`
  max-width: 90vw;
  width: fit-content;
  height: 50vh;
  position: fixed;
  z-index: 150;
  color: #171010;
  background: #c4a1a1;
  border-radius: 4px;
  left: 50%;
  top: 2vh;
  transform: translateX(-50%);
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  @media (min-width: 768px) {
    padding: 2rem 4rem;
  }
  @media (min-width: 1080px) {
    padding: 2rem 6em;
  }
`;

const Score = styled.div``;

const NameForm = styled.form``;

const NameLabel = styled.label``;

const NameInput = styled.input``;

const Name = styled.div``;

const Button = styled.button``;

const EndGameModal = ({ updateScores }) => {
  const [name, setName] = useState();
  const [input, setInput] = useState("");
  const [score, setScore] = useState();

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
        <Score>{score}</Score>
        <NameForm onSubmit={handleClick}>
          {!name && (
            <>
              <NameLabel></NameLabel>
              <NameInput
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                // ref={inputRef}
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
