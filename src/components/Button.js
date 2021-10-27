import styled from "styled-components";

const Button = styled.button`
  margin-top: 2.5rem;
  font-size: 1.3rem;
  padding: 0.5rem;
  border: 3px solid transparent;
  background: #08d9d6;
  color: #252a34;
  align-self: end;
  font-weight: 500;

  &:hover {
    background: transparent;
    border-color: #08d9d6;
    color: #08d9d6;
  }
`;

export default Button;
