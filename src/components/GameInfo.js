import React from "react";
import styled, { css, keyframes } from "styled-components";

const animationOpenGameInfo = keyframes`
0% {
  top: -100%;
}
100% {
  top: 8vh;
}
`;

const animationRuleOpenGameInfo = css`
  ${animationOpenGameInfo} 1s ease-out forwards
`;

const StyledGameInfo = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  animation: ${animationRuleOpenGameInfo};
  z-index: 90;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextPannel = styled.p`
  width: 80%;
  border-radius: 0 0 4px 4px;
  text-align: center;
`;

const GameInfo = () => {
  return (
    <StyledGameInfo>
      <TextPannel>aaa</TextPannel>
    </StyledGameInfo>
  );
};

export default GameInfo;
