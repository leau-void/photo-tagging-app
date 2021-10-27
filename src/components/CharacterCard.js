import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  display: grid;
  grid:
    [row1-start] "icon name" auto [row1-end]
    [row2-start] "icon origin" auto [row2-end]
    / 100px auto;
  gap: 1rem;
  place-items: center;

  &.header {
    gap: 0.5rem;
  }
`;

const Name = styled.h4`
  grid-area: name;
  margin: 0;
  align-self: end;
  text-align: center;
`;

const Origin = styled.div`
  grid-area: origin;
  align-self: start;
  width: 100%;
  text-align: center;
  font-style: italic;
  font-size: 1rem;
`;

const CharIcon = styled.img.attrs((props) => ({
  src: props.img,
  width: 80,
  height: 80,
}))`
  min-width: 80px;
  min-height: 80px;
  height: 6rem;
  width: 6rem;
  object-fit: cover;
  object-position: 50% -5%;
  grid-area: icon;
  border-radius: 10px;

  .header & {
    width: 4rem;
    height: 4rem;
  }
`;

const CharacterCard = ({ name, origin, img, header }) => {
  return (
    <StyledCard className={header ? "header" : ""}>
      <Name>{name}</Name>
      <Origin>{origin}</Origin>
      <CharIcon img={img} />
    </StyledCard>
  );
};

export default CharacterCard;
