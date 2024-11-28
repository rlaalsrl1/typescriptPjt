//작성된 게시글을 시간순으로 불러와 보여주는 컴포넌트

import { useEffect, useState } from "react";
import styled from "styled-components";
import { IPost } from "../types/postinput.type";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Post from "./Post";
import { Unsubscribe } from "firebase/auth";

const Container = styled.div`
  color: white;
`;

export default () => {
  //게시글들을 저장할 State
  const [posts, setPosts] = useState<IPost[]>([]);
  //Page Logic Process
  //게시글을 시간 순으로 불러와 보여주기
  const getPosts = async () => {
    //1.게시글을 불러오기 From Firebase(Server)
    const path = collection(firestore, "posts");
    //2.불러온 게시글을 시간 순으로 정렬
    const condition = orderBy("createdAt", "desc");
    const postsQuery = query(path, condition);
    //3.어떤 형태로 보여줄 지?
    const result = await getDocs(postsQuery);
    const timelinePosts = result.docs.map((doc) => {
      //  -닉네임, 작성시간,게시글내용,유저ID,프로필이미지
      const { userId, nickname, post, createdAt, email } = doc.data() as IPost;
      //내가 쓸수 있도록 형태를 수정
      return {
        userId: userId,
        nickname: nickname,
        post: post,
        createdAt: createdAt,
        email: email,
      };
    });
    //4.불러와서 재가공한 데이터를 State에 저장
    setPosts(timelinePosts);
  };
  //Timeline 컴포넌트가 실행되는 순간,게시글 불러오기
  useEffect(() => {
    //게시글 불러오기
    // getPosts();

    //realtime으로 게시글을 불러오기
    const getPostsRealTime = async () =>{
      //1.listener 등록을 위한 구동장치 생성
    let unSubscribe : Unsubscribe | null = null;
    //2.Firebase DB에서 게시글 검색해서 반환할 쿼리 생성
    const path = collection(firestore, "posts");
    const condition = orderBy("createdAt", "desc");
    const postsQuery = query(path, condition);
    //4.받아온 게시글을 구독장치에 등록하여 실시간 체크
    unSubscribe = await onSnapshot(postsQuery, (snapshot)=>{
      //3.생성된 쿼리를 통해 게시글 받아오기=>가공
      const timelinePosts = snapshot.docs.map((doc)=>{
        const {createdAt, email, nickname, post, userId} = doc.data() as IPost;
        return{
          createdAt,
          email,
          nickname,
          post,
          userId
        }
      })
      setPosts(timelinePosts);
    })
    }
    //5.Timeline 페이지에서 나가면, 구독해제(=실시간체크 해제)
    getPostsRealTime();
  }, []);
  //Page Design Rendering
  return (
    <Container>
      {posts.map((post) => {
        //posts에서 가져온 post를 보여주기
        return <Post 
          email={post.email}
          nickname={post.nickname}
          createdAt={post.createdAt}
          userId={post.userId}
          post={post.post}
        />;
      })}
    </Container>
  );
};
