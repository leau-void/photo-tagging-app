import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useElementSize, useToggle } from "../hooks";
import cursorImg from "../assets/cursor.svg";
import TaggingMenu from "./TaggingMenu";
import { usePixelRatio } from "../hooks";

const StyledGameArea = styled.main`
  margin-top: 8vh;
  width: 100%;
  height: calc(100vh - 8vh - 40px);
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img.attrs((props) => ({
  src: props.imageSrc,
  alt: "Game Image",
  width: props.width - 15 + "px",
  height: "auto",
}))`
  display: block;
  position: absolute;
  top: 0;
  height: auto;
  cursor: url(${cursorImg}) 50 50, auto;
`;

const GameArea = ({ imageSrc }) => {
  const containerRef = useRef();
  const elementSize = useElementSize(containerRef);
  const [isTaggingOpen, toggleIsTaggingOpen] = useToggle([false, true], 0);
  const [lastClick, setLastClick] = useState({});

  const clickHandler = (e) => {
    setLastClick({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    toggleIsTaggingOpen();
  };

  const pixelRatio = usePixelRatio();

  return (
    <StyledGameArea ref={containerRef} cursor={cursorImg}>
      {console.log(pixelRatio) && null}

      <Image
        {...{
          imageSrc,
          width: elementSize ? elementSize.width : 300,
        }}
        onClick={clickHandler}
      />
      {isTaggingOpen && <TaggingMenu {...{ lastClick }} />}
    </StyledGameArea>
  );
};

export default GameArea;
