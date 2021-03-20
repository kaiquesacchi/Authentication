import styled from "styled-components";

export const Divider = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 2px;
  background-color: ${(p) => p.theme.palette.focusBlock.contrast + "40"};
`;
