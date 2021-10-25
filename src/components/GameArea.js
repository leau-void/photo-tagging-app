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
  const [offset, setOffset] = useState();
  const imgRef = useRef();
  const imgSize = useElementSize(imgRef);
  const pixelRatio = usePixelRatio();

  const clickHandler = (e) => {
    // console.log({
    //   x: (e.nativeEvent.offsetX / imgSize.width) * pixelRatio * 2000,
    //   y: (e.nativeEvent.offsetY / imgSize.height) * pixelRatio * 8422,
    // });

    setLastClick({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });

    toggleIsTaggingOpen();
  };

  const offsetHandler = (e) => {
    if (
      e.currentTarget !== containerRef.current ||
      e.target !== imgRef.current ||
      isTaggingOpen
    )
      return;

    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    const containerOffsetX = e.pageX - currentTargetRect.left;
    const containerOffsetY = e.pageY - currentTargetRect.top;

    const diffX =
      containerSize.width - containerOffsetX * pixelRatio - 15 * pixelRatio;
    const diffY =
      containerSize.height - containerOffsetY * pixelRatio - 15 * pixelRatio;

    let offsetValue = "";

    const ratio = pixelRatio > 1.2 ? (pixelRatio - 1) * 0.25 + 1 : pixelRatio;

    if (diffX < 175 * ratio) offsetValue += "x ";
    if (diffY < 175 * ratio) offsetValue += "y ";

    setOffset(offsetValue);
  };

  return (
    <StyledGameArea
      ref={containerRef}
      cursor={cursorImg}
      onClick={offsetHandler}>
      <Image
        {...{
          imageSrc,
          width: containerSize ? containerSize.width : 300,
        }}
        onClick={clickHandler}
        ref={imgRef}
      />
      {isTaggingOpen && <TaggingMenu {...{ lastClick, offset }} />}
    </StyledGameArea>
  );
};

export default GameArea;
