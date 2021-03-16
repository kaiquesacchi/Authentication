import styled from "styled-components";

export const Container = styled.div``;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;

  border-color: ${(p) => p.theme.palette.focusBlock.contrast + "40"};
`;

export const Label = styled.label``;
