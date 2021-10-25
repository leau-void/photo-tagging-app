import React from "react";
import styled, { css, keyframes } from "styled-components";
import Animate from "../utils/Animate";

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

  &.closing-setup {
    animation: none;
  }
  &.closing {
    animation: ${animationRuleOpenGameInfo};
    animation-direction: reverse;
  }
`;

const TextPannel = styled.p`
  width: 80%;
  border-radius: 0 0 4px 4px;
  text-align: center;
`;

const GameInfo = ({ doOpen }) => {
  return (
    <Animate {...{ doOpen, animationDuration: 1000 }}>
      <StyledGameInfo>
        <TextPannel>aaa</TextPannel>
      </StyledGameInfo>
    </Animate>
  );
};

export default GameInfo;
