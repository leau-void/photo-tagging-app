import React, { useRef } from "react";
import styled from "styled-components";
import { useElementSize } from "../hooks";
import cursorImg from "../assets/cursor.svg";

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
  cursor: url(${cursorImg}) 50 50, auto;
`;

const GameArea = ({ imageSrc }) => {
  const containerRef = useRef();
  const elementSize = useElementSize(containerRef);

  return (
    <StyledGameArea ref={containerRef} cursor={cursorImg}>
      <Image
        {...{
          imageSrc,
          width: elementSize ? elementSize.width : 300,
        }}
        onClick={(e) => console.log(e.nativeEvent.offsetX)}
      />
    </StyledGameArea>
  );
};

export default GameArea;
