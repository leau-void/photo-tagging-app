import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  width: 80vw;
  height: 80vh;
  position: fixed;
  z-index: 110;
  color: white;
  background: #362222;
  border-radius: 4px;
  top: 8vh;
  left: 10vw;
`;

const Modal = (props) => {
  return <StyledModal></StyledModal>;
};

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 109;
  background: rgba(43, 43, 43, 0.7);
`;

const ModalStartGame = ({ isOpen, toggleIsOpen }) => {
  return (
    <>
      {isOpen && (
        <>
          <Modal></Modal>
          <ModalBg />
        </>
      )}
    </>
  );
};

export default ModalStartGame;
