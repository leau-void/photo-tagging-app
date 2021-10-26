import React from "react";
import styled, { css, keyframes } from "styled-components";
import Animate from "../utils/Animate";

const animationOpenGameInfo = keyframes`
0% {
  top: -100%;
}
100% {
  top: calc(8vh - 3px);
}
`;

const animationRuleOpenGameInfo = css`
  ${animationOpenGameInfo} 0.4s ease-out forwards
`;

const StyledGameInfo = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: calc(8vh - 3px);
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
  border-radius: 0 0 8px 8px;
  height: 100%;
  line-height: 70px;
  text-align: center;
  background: #252a34;
  border: 3px solid #eaeaea;
  font-weight: 500;
  border-top: 0;
`;

const GameInfo = ({ doOpen, infoText }) => {
  return (
    <Animate {...{ doOpen, animationDuration: 400 }}>
      <StyledGameInfo>
        <TextPannel>{infoText}</TextPannel>
      </StyledGameInfo>
    </Animate>
  );
};

export default GameInfo;
