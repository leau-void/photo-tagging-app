import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useElementSize, usePixelRatio, useToggle } from "../hooks";
import cursorImg from "../assets/cursor.svg";
import TaggingMenu from "./TaggingMenu";

const StyledGameArea = styled.main`
  margin-top: 8vh;
  width: 100%;
  height: calc(100vh - 8vh - 40px);
  overflow-x: scroll;
  position: relative;
`;

const Image = styled.img.attrs((props) => ({
  src: props.imageSrc,
  alt: "Game Image",
  width: props.width - 15 + "px",
}))`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  cursor: url(${cursorImg}) 50 50, auto;
`;

const GameArea = ({ imageSrc }) => {
  const containerRef = useRef();
  const containerSize = useElementSize(containerRef);
  const [isTaggingOpen, toggleIsTaggingOpen] = useToggle([false, true], 0);
  const [lastClick, setLastClick] = useState({});
  const imgRef = useRef();
  const imgSize = useElementSize(imgRef);
  const pixelRatio = usePixelRatio();

  const clickHandler = (e) => {
    console.log({
      x: (e.nativeEvent.offsetX / imgSize.width) * pixelRatio * 2000,
      y: (e.nativeEvent.offsetY / imgSize.height) * pixelRatio * 8422,
    });

    setLastClick({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    toggleIsTaggingOpen();
  };

  return (
    <StyledGameArea ref={containerRef} cursor={cursorImg}>
      <Image
        {...{
          imageSrc,
          width: containerSize ? containerSize.width : 300,
        }}
        onClick={clickHandler}
        ref={imgRef}
      />
      {isTaggingOpen && <TaggingMenu {...{ lastClick }} />}
    </StyledGameArea>
  );
};

export default GameArea;
