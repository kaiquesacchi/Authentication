import styled from "styled-components";

export const Title = styled.h1`
  padding-bottom: 20px;
`;

export const Divider = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 2px;
  background-color: ${(p) => p.theme.palette.focusBlock.contrast + "40"};
`;
