import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  width: 80%;
  display: grid;
  grid-template-columns: 40% 1fr;
  box-shadow: 0px 0px 7px 3px #00000020;
  height: fit-content;

  @media screen and (max-width: ${(p) => p.theme.breakpoints.md}) {
    width: 100%;
  }

  @media screen and (max-width: ${(p) => p.theme.breakpoints.sm}) {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

export const SideContent = styled.div<iMainContent>`
  background-color: ${(p) => p.theme.palette.primary.main};
  color: ${(p) => p.theme.palette.primary.contrast};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px 5%;
  @media screen and (max-width: ${(p) => p.theme.breakpoints.sm}) {
    flex: 1;
    padding-bottom: 0;
  }
`;

interface iMainContent {
  center?: boolean;
}
export const MainContent = styled.div<iMainContent>`
  display: flex;
  flex-direction: column;
  align-items: ${(p) => (p.center ? "center" : "unset")};
  background-color: ${(p) => p.theme.palette.focusBlock.main};
  padding: 50px;

  @media screen and (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: 50px 20px;
  }
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 300;
  @media screen and (max-width: ${(p) => p.theme.breakpoints.lg}) {
    font-size: 3rem;
  }
`;
