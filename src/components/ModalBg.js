import React from "react";
import styled from "styled-components";

const StyledBg = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 109;
  background: rgba(43, 43, 43, 0.7);
`;

const ModalBg = () => <StyledBg />;

export default ModalBg;
