//home 화면을 구성
import styled from "styled-components";
import PostInput from "../components/PostInput";

//styles-component 를 통한 css 구성
const Container = styled.div``;
const Title = styled.h1`
  color: white;
`;

//실제 페이지를 구성하는 code
export default () => {
  return (
    <Container>
      <Title>Home</Title>
      {/* 게시글 작성하기 */}
      <PostInput />
    </Container>
  );
};
