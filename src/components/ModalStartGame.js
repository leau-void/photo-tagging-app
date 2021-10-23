import React from "react";
import styled from "styled-components";

const ModalMain = () => {
  return <div></div>;
};

const StyledModal = styled(ModalMain)`
  width: 80vw;
  height: 80vh;
  position: fixed;
`;

const ModalBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(43, 43, 43, 0.7);
`;

const ModalStartGame = ({ isOpen, toggleIsOpen }) => {
  return (
    <>
      {isOpen && (
        <>
          <StyledModal />
          <ModalBg />
        </>
      )}
    </>
  );
};

export default ModalStartGame;
