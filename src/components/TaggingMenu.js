import React, { useContext } from "react";
import styled from "styled-components";
import cursorImg from "../assets/cursor.svg";
import { usePixelRatio } from "../hooks";
import GameDataContext from "../context/GameData";

const DropDown = styled.div`
  background: rgba(255, 255, 255, 0.7);
  position: relative;
  top: 25px;
  left: 25px;
  z-index: 99;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &.x {
    transform: translateX(-100%);
    right: 25px;
    left: unset;
  }

  &.y {
    transform: translateY(-100%);
    bottom: 25px;
    top: unset;
  }

  &.x.y {
    transform: translate(-100%, -100%);
  }
`;

const DropDownOption = styled.div`
  padding: 0.5rem;
  color: #171010;
  font-size: 1rem;
  border-radius: 4px;
  word-wrap: nowrap;
  width: 100%;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.9);
  }
`;

const TargetBox = styled.div`
  width: 100px;
  height: 100px;
  border: 5px dashed white;
  border-radius: 50%;
  position: absolute;
  background: rgba(255, 255, 255, 0.25);
  top: -50px;
  left: -50px;
  z-index: 98;
`;

const StyledMenu = styled.div`
  position: absolute;
  z-index: 90;
  cursor: url(${cursorImg}) 50 50, auto;
  top: ${(props) => props.lastClick.y + "px"};
  left: ${(props) => props.lastClick.x + "px"};
`;

const TaggingMenu = ({ lastClick, offset, selectionHandler }) => {
  const pixelRatio = usePixelRatio();
  const { characters } = useContext(GameDataContext);

  return (
    <StyledMenu {...{ pixelRatio, lastClick }}>
      <TargetBox />
      <DropDown onClick={selectionHandler} className={offset}>
        {characters.map((char, i) => (
          <DropDownOption key={i}>{char.name}</DropDownOption>
        ))}
      </DropDown>
    </StyledMenu>
  );
};

export default TaggingMenu;
