import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  color: black;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default () => {
  const naivation = useNavigate();
  //Google 로그인 진행하기
  const onClick = async () => {
    try {
      //1. provider 생성 (Google 로그인을 위한 제공자)
      const provider = new GoogleAuthProvider();
      //2. Google 로그인 창 띄우기(server와 소통,,, 시간 차 ... 비동기화.. async-await)
      await signInWithPopup(auth, provider);
      //3. 로그인 성공시 , Home화면으로 이동
      naivation("/");
    } catch (e) {
      console.log(e);
      //만일 firebase에러라면 알람
      if (e instanceof FirebaseError) {
        alert(e.message);
      }
    }
  };

  return <Container onClick={onClick}>Google 계정으로 로그인 하기</Container>;
};
