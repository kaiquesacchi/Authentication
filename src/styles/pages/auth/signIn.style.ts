import styled from "styled-components";

export const Title = styled.h1`
  padding-bottom: 20px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
`;

export const Divider = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 2px;
  background-color: ${(p) => p.theme.palette.focusBlock.contrast + "40"};
`;

interface iButton {
  color?: "primary" | "secondary";
}
export const Button = styled.button<iButton>`
  background-color: ${(p) => (p.color ? p.theme.palette[p.color].main : "transparent")};
  color: ${(p) => (p.color ? p.theme.palette[p.color].contrast : p.theme.palette.focusBlock.contrast)};

  padding: 10px;
  border-radius: 5px;
  border: none;

  :hover {
    box-shadow: 0px 0px 5px 2px #00000020;
  }
`;
