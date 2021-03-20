import styled from "styled-components";

interface iButton {
  accent?: "primary" | "secondary";
}

export const Button = styled.button<iButton>`
  background-color: ${(p) => (p.accent ? p.theme.palette[p.accent].main : "transparent")};
  color: ${(p) => (p.accent ? p.theme.palette[p.accent].contrast : p.theme.palette.focusBlock.contrast)};

  padding: 10px;
  border-radius: 5px;
  border: none;

  :hover {
    box-shadow: 0px 0px 5px 2px #00000020;
  }
`;
