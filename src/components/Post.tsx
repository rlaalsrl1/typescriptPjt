//서버로부터 받아온 데이터를 예쁘게 포장해서 보여줌
//-닉네임, 프로필, 작성시간, 내용
import styled from "styled-components";
import { IPost } from "../types/postinput.type";
import moment from "moment";
import PostMenu from "./Post-Menu";

const Container = styled.div`
display: flex;
gap:10px;
padding: 20px;
border: 1px solid #1c1a1a;
`;
const ProfileBox = styled.div``;
const Photo = styled.div`
  width: 30px;
  height: 30px;
  background-color: tomato;
`;
const DateBox = styled.div``;
const UserName = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin-right: 5px;
`;
const UserEmail = styled.span`
  font-size: 13px;
  color: #51b4ff;
`;
const Content = styled.div`
  margin: 10px 0px;
`;
const CreateTime = styled.div`
  font-size: 12px;
  color: #4d4d4d;
`;
const Footer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;



// type PostType =  {userId:String; nickname:String; post : String; createdAt : Number;}; 치환 예시
export default ({userId, nickname, post, createdAt, email} : IPost) => {
  return <Container>
    {/* 프로필 이미지(optional) */}
    <ProfileBox>
      <Photo/>
    </ProfileBox>
    {/* 불러온 게시글 표시 */}
    <DateBox>
      <UserName>{nickname}</UserName>
      <UserEmail>{email}</UserEmail>
      <Content>{post}</Content>
      <CreateTime>{moment(createdAt).fromNow()}</CreateTime>
      <Footer>
        <PostMenu menu='view' count={99}/>
        <PostMenu menu='likes' count={21}/>
        <PostMenu menu='comments' count={33}/>
      </Footer>
    </DateBox>
  </Container>;
};
