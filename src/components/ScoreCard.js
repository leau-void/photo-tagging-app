import React from "react";
import styled from "styled-components";

const StyledScoreCard = styled.div``;

const ScoreCard = ({ score, i }) => {
  return <StyledScoreCard>Score {i}</StyledScoreCard>;
};

export default ScoreCard;
