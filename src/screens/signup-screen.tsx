//sign-up 화면을 구성
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { env } from "process";
// import LogoImg from "../assets/images/DaelimX_Title.png"
//styles-component 를 통한 css 구성
const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;
//화면 타이틀 텍스트
const Title = styled.h1`
  color: white;
  font-size: 25px;
  font-weight: 600;
`;
//화면 타이틀 로고
const Logo = styled.img`
  width: 400px;
  height: 200px;
`;
//ID/PW 텍스트 Input Field(Form)
//ㄴ1. Form(텍스트 인풋 필드를  담을 공간)
const Form = styled.form`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 400px;
`;
//ㄴ2. 각각(ID, PW)의 Input Field
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;

  &::placeholder {
    font-size: 0.8em;
  }
  &[type="submit"] {
    margin-top: 30px;
    cursor: pointer;
  }
`;
const InputTitle = styled.p`
  color: white;
  font-size: 8px;
  margin-top: 10px;
  margin-bottom: 5px;
`;
const SignupBtn = styled.div`
  padding: 10px 15px;
  background-color: #1f8acc;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
`;
//에러메시지 출력 컴포넌트
const ErrorMsg = styled.p`
  color: red;
  font-weight: 600;
  font-size: 10px;
  text-align: center;
  a {
    color: #f12fff;
    font-weight: bold;
  }
`;
//로그인 페이지 이동을 위한 Guide
const Guide = styled.span`
  text-align: center;
  margin-top: 30px;
  font-size: 14px;
`;
//실제 페이지를 구성하는 code
export default () => {
  //회원가입을 하기 위한 Process 코드 작성
  //페이지 이동을 위한 Hook
  const navigation = useNavigate();
  //A.회원정보를 저장할 데이터(State)

  const [nickName, setNickName] = useState(""); //Name
  const [email, setEmail] = useState(""); //Email
  const [password, setPassword] = useState(""); //Password
  const [loading, setLoading] = useState(false); //Loading
  const [error, setError] = useState(""); //Error
  //B.회원정보를 입력할 때 실행,(유저가 일렵한 정보 가공/수정)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //0.입력된 정보에서 값(입력위치, 입력값)을 알아와야 한다
    //const name = e.target.name;//ㄴ 입력위치
    //const value = e.target.value;//ㄴ 입력값
    //1.어디서 입력된 정보(event)인지 알아야 함
    const {
      target: { name, value },
    } = e;
    //2.입력된 장소(name, email, pw)에 따라 각각 데이터(state)를 저장
    switch (name) {
      case "name":
        setNickName(value);
        /*console.log("Name:" , value);*/ break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
    //3.저장한 데이터를 Page에 보여준다.
  };
  // async()=>{
  //     //1.회원가입 요청
  //     //2.기다려..
  //     await
  //     //3.요청완료 확인. 다음 작업
  // }
  //C.회원가입 버튼 눌렀을 때 (입력한 정보 전달)
  const onSubmit = async () => {
    //A. 방어코드:: 잘못 입력 시, 제출X(STOP)
    if (nickName === "" || email === "" || password === "") {
      //회원가입 프로세스를 진행하지 않고 "종료"
      alert("회원정보를 입력해 주세요");
      return;
    }
    //B. 회원가입 프로세스 진행
    try {
      //회원가입 프로세스 진행
      //1
      //2 ---에러 발생!
      //3
      //b-1. 로딩 시작....
      setLoading(true);
      //b-2. 사용자가 입력한 전달할 데이터 확인
      //b-3. API를 통해 Server(Firebase)에 값(입력한 회원정보)을 전달
      //b-4. 서버에서... 저장 중...
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //b-4-1. 회원가입 완료된 유저의 닉네임 UPDATE
      await updateProfile(credential.user, {
        displayName: nickName,
      });
      //b-5. 저장이 완료되면 로그인 화면으로 이동 or 자동 로그인=> 홈 화면
      navigation("/");
    } catch (e) {
      console.log(e);
      //[Firebase erorr]--통신 x, 중복된 이메일, 잘못된 비밀번호
      //1. 만일 발생한 에러가 Firebase Error라면
      if (e instanceof FirebaseError) {
        //2.firebase 에러 메시지를 화면에 출력
        setError(e.code);
      }
      console.log(e);
      //만인 Try문 실행 에러 발생 시, 실행
    } finally {
      setLoading(false);
      //ALWAYS
      //Try,catch문 실행 후, 무조건 실행되는 녀석
    }

    // error-- 통신X, 중복된 이메일, 잘못된 PW...
    //-에러 메시지 출력

    // ALWAYS 프로세스 끝나면, 로딩 종료
  };

  //페이지 레이아웃(Design)반환
  return (
    <Container>
      <Logo src={`${process.env.PUBLIC_URL}/DaelimX_Title.png`} />
      <Title>회원가입</Title>
      <Form>
        <InputTitle>닉네임*</InputTitle>
        <Input
          onChange={onChange}
          name="name"
          type="text"
          placeholder="예)Daelim"
          value={nickName}
        />
        <InputTitle>이메일*</InputTitle>
        <Input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="예)Daelim@daelim.ac.kr"
          value={email}
        />
        <InputTitle>비밀번호*</InputTitle>
        <Input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="***********"
          value={password}
        />
        {/* <Input onSubmit={onSubmit} type="submit" value={loading === true? "로딩중" : "회원가입"}/> */}
        <SignupBtn onClick={onSubmit}>
          {loading ? "로딩 중..." : "가입하기"}
        </SignupBtn>
        <ErrorMsg>{error}</ErrorMsg>
        <Guide>
          이미 계정이 있으신가요?
          <Link to="/signin">로그인</Link>
        </Guide>
      </Form>
    </Container>
  );
};
// const ErrorMesage;
