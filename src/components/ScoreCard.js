import React from "react";
import styled from "styled-components";
import formatTime from "../utils/formatTime";

const StyledScoreCard = styled.div``;

const ScoreCard = ({ score, rank }) => {
  return (
    <StyledScoreCard>
      {rank} : {formatTime(score.end - score.start)}
    </StyledScoreCard>
  );
};

export default ScoreCard;
