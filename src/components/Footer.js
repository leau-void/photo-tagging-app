import React from "react";
import styled from "styled-components";
import { Github } from "@styled-icons/bootstrap";

const StyledFooter = styled.footer`
  margin-top: auto;
  line-height: 30px;
  text-align: center;
  padding: 5px 0;
  order: 99;
  background: #171010;
  color: #d8c0c0;
  height: 40px;
`;

const StyledGithubLink = styled.a.attrs(() => ({
  href: "https://github.com/leau-void/photo-tagging-app",
  target: "_blank",
}))`
  opacity: 0.7;
  color: inherit;
  &:hover {
    opacity: 1;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      Made with <span style={{ color: "#e25555" }}>&#9829;</span> by Leau{" "}
      <StyledGithubLink>
        <Github style={{ width: "30px" }} />
      </StyledGithubLink>
    </StyledFooter>
  );
};

export default Footer;
