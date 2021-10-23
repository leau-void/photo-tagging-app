import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  width: 100vw;
  position: fixed;
  top: 0;
  height: 8vh;
  justify-content: space-around;
  align-items: center;
  background: #171010;
`;

const GameHeader = () => {
  return (
    <StyledHeader>
      <div>Game Name</div>
      <div>Timer</div>
      <button>Characters</button>
    </StyledHeader>
  );
};

export default GameHeader;
