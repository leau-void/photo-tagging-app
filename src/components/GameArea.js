import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import { useElementSize } from "../hooks";

const StyledGameArea = styled.main`
  margin-top: 8vh;
  width: 100%;
  height: calc(100vh - 8vh - 40px);
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img.attrs((props) => ({
  src: props.imageSrc,
  alt: "Game Image",
  width: props.width - 15 + "px",
}))`
  display: block;
`;

const GameArea = ({ imageSrc }) => {
  const containerRef = useRef();
  const elementSize = useElementSize(containerRef);

  return (
    <StyledGameArea ref={containerRef}>
      <Image
        {...{
          imageSrc,
          width: elementSize ? elementSize.width : 300,
        }}
      />
    </StyledGameArea>
  );
};

export default GameArea;
