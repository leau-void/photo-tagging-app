import React from "react";
import styled from "styled-components";

const StyledCard = styled.div``;

const Name = styled.h4``;

const CharIcon = styled.img.attrs((props) => ({
  src: props.img,
  width: 80,
  height: 80,
}))`
  object-fit: cover;
`;

const CharacterCard = ({ name, img }) => {
  return (
    <StyledCard>
      <Name>{name}</Name>
      <CharIcon img={img} />
    </StyledCard>
  );
};

export default CharacterCard;
