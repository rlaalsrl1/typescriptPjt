//게시글을 작성하고, server(Firebase)에 업로드하는 컴포넌트

import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { IPost } from "../types/postinput.type";
import { addDoc, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

const Form = styled.form`
  display: flex;
  gap: 10px;
  border: 1px solid #1c1a1a;
  padding: 20px 5px;
`;

const PostArea = styled.div`
  flex: 1;
`;
const TextArea = styled.textarea`
  padding: 10px;
  resize: none;
  background-color: black;
  color: white;
  width: 100%;
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: none;
    border-color: #0000ff;
  }
  &::placeholder {
    color: #1f2020;
  }
`;
const Question = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: gold;
  border-radius: 20px;
  height: 30px;
  display: flex;
  justify-content: center;
  font-size: large;
  font-weight: 600;
`;
const RadioButton = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
const BottomMenu = styled.div`
  display: flex;
  justify-content: right;
`;

const SubmitButton = styled.input`
  background-color: firebrick;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
export default () => {
  //Page Logic Rendering
  //1.작성한 텍스트,업로드한 이미지
  const [post, setPost] = useState<string>("");
  const [file, setFile] = useState<File>();
  //1-a. TextArea 의 정보를 담을 Ref생성
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //2.작성한/변경된 텍스트를 State에 저장
  const onChage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //1.텍스트 변경 시 발생하는 Event에서 value값 가져오기
    //const value = e.target.value;
    const value = e.target.value;
    //2.value값을 State에 저장
    setPost(value);
    //3.텍스트를 개행 높이 부분을 통해 TextArea 높이 자동조절
    if (textareaRef && textareaRef.current) {
      //-TextArea 높이
      textareaRef.current.style.height = "auto";
      //-TextArea 스크롤 높이
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };
  //3.업로드한 이미지(File)를 State에 저장
  const onChageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //1.발생한 Event에서 File 정보를 가져옴
    const files = e.target.files;
    //2.[방어코드]: 가져온 File에 존재하는 경우
    //--값이 들어가 있는지 확인 + 이미지가 1개만 선택된 경우
    if (files && files.length === 1) {
      //3.File정보를 State에 저장
      setFile(files[0]);
    }
  };
  //4.작성한 게시글 정보를 Server(Firebase)에 업로드
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //페이지 렌더링을 막고, 제출가능하도록 페이지 유지
    e.preventDefault();
    //---------Loading Start--------
    try {
      //0.[방어코드] : 로그인하지않았거나, 게시글 내용일 없거나... 실행시키지 않음
      const user = auth.currentUser;
      if (user === null || post === "") {
        return;
      }
      //1.Firebase에 전달할 정보가 필요
      //ㄴ1-a. 게시글 내용, 1-b. 이미지==>"이미 가지고 있다(post)(file)"
      //2.Firebase에 전달할 정보를 담은 객체(Object) 생성
      // -게시글 내용
      //-게시글 작성(생성)시간
      //-게시글 작성자 닉네임(user)
      //-게시글 작성자 uid(user)
      //-이미지
      const myPost: IPost = {
        //키 : 값,
        post: post,
        createdAt: Date.now(), //UTC
        nickname: user.displayName || "익명",
        userId: user.uid,
        email: ""
      };
      //3.Firebase에 전달
      await addDoc(collection(firestore, "posts"), myPost);
    } catch (error) {
      //----------Error 발생 시, 예외 처리--------
      console.error(error);
    } finally {
      //--------Loading End----------
    }
  };

  //Page Design Rendering
  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      {/* 게시글 작성영역 */}
      <PostArea>
        <TextArea
          ref={textareaRef}
          rows={5}
          value={post}
          onChange={(e) => onChage(e)}
          maxLength={200}
          placeholder="무슨일이 벌어지고 있나요?"
        />

        {/* Radio Buttons 영역 */}
        <Question>오늘 다른 사람들에게 친절하게 대했나요?</Question>
        <RadioButton>
          <label>
            <input type="radio" name="give" value="-1" />
            별로
          </label>
          <label>
            <input type="radio" name="give" value="0" />
            어느정도
          </label>
          <label>
            <input type="radio" name="give" value="1" />
            당연하지
          </label>
        </RadioButton>
        <Question>오늘 다른 사람들이 당신에게 친절하게 대했주었나요?</Question>
        <RadioButton>
          <label>
            <input type="radio" name="undergo" value="-1" />
            별로
          </label>
          <label>
            <input type="radio" name="undergo" value="0" />
            어느정도
          </label>
          <label>
            <input type="radio" name="undergo" value="1" />
            당연하지
          </label>
        </RadioButton>
        <Question>오늘 하루는 행복했나요?</Question>
        <RadioButton>
          <label>
            <input type="radio" name="happiness" value="-1" />
            별로
          </label>
          <label>
            <input type="radio" name="happiness" value="0" />
            어느정도
          </label>
          <label>
            <input type="radio" name="happiness" value="1" />
            당연하지
          </label>
        </RadioButton>
        <BottomMenu>
          <Link to={"/profile"}>
            <SubmitButton type={"submit"} value={"작성하기"} />
          </Link>
        </BottomMenu>
      </PostArea>
    </Form>
  );
};
