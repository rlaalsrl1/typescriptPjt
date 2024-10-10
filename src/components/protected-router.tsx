import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import home from "../screens/home";
import Profile from "../screens/Profile";

type Props = {
  children: React.ReactNode;
};
//로그인 되어 있지 않은 상태에서 Home/Profile 접근을 막음

export default ({ children }: Props) => {
  //1.현재 유저가 로그인 했는지 안 했는지 여부를 알아야함
  //user 안의 값이 존재한다면 1-A로 없다면 1-B로
  const user = auth.currentUser;
  //1-A :로그인을 한 상태라면?
  if (user) {
    //그대로 진행하면 됨(Home화면에 머물면 됨)
    return <>{children}</>;
  }
  //1-B :로그인을 안 한 상태라면?
  else {
    //로그인 화면으로 이동
    //useNavigator 사용시 :사용자의 코드에 따라 실행될 때 사용
    //<navigate /> 컴포넌트 사용시 : Redirect, 코드와 상관없이 특정 분기 상황에서 사용
    return <Navigate to={"/signin"} />;
  }
};
