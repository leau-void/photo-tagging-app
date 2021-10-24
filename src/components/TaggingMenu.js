import React from "react";
import styled from "styled-components";
import cursorImg from "../assets/cursor.svg";
import { usePixelRatio } from "../hooks";

const DropDown = styled.div`
  background: rgba(255, 255, 255, 0.7);
  position: relative;
  top: 25px;
  left: 25px;
  z-index: 99;
  cursor: pointer;
  border-radius: 4px;
`;

const DropDownOption = styled.div`
  padding: 0.5rem;
  color: #171010;
  font-size: 1rem;
  border-radius: 4px;

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

const TaggingMenu = ({ lastClick }) => {
  const pixelRatio = usePixelRatio();

  return (
    <StyledMenu {...{ pixelRatio, lastClick }}>
      <TargetBox />
      <DropDown>
        <DropDownOption>Option 1</DropDownOption>
        <DropDownOption>Option 2</DropDownOption>
        <DropDownOption>Option 3</DropDownOption>
      </DropDown>
    </StyledMenu>
  );
};

export default TaggingMenu;
