import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

//animation
const BounceAnimation = keyframes`
  0%{
      transform: scale(1);
  }
  50%{
      transform: scale(1.5);
  }
  100%{
    transform: scale(1);
  }
`;
//점 (Dot)
const Dot = styled.span`
  background-color: white;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  animation: ${BounceAnimation} 1.5s infinite;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export default () => {
  return (
    <Container>
      <Dot />
      <Dot />
      <Dot />
    </Container>
  );
};
