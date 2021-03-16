import styled from "styled-components";

interface iContainer {
  center?: boolean;
}
export const Container = styled.div<iContainer>`
  display: flex;
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : "unset")};

  background-color: ${(p) => p.theme.palette.focusBlock.main};
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 3px #00000020;
`;
