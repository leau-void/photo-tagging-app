import React from "react";
import styled from "styled-components";
import formatTime from "../utils/formatTime";

const StyledScoreCard = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1fr;
  text-align: center;
`;

const Rank = styled.div`
  font-weight: 600;
  color: #08d9d6;
`;

const Name = styled.div``;

const Score = styled.div`
  font-weight: 500;
`;

const ScoreCard = ({ score, rank }) => {
  return (
    <StyledScoreCard>
      <Rank>{rank}</Rank>
      <Name>{score.displayName}</Name>
      <Score>{formatTime(score.end - score.start)}</Score>
    </StyledScoreCard>
  );
};

export default ScoreCard;
