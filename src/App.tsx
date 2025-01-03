import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import Profile from "./screens/Profile";
import SigninScreen from "./screens/signin-screen";
import SignupScreen from "./screens/signup-screen";
import SignupScreenEx from "./screens/signup-screen-ex";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ProtectedRouter from "./components/protected-router";
import { auth } from "./firebaseConfig";
import LoadingScreen from "./screens/loading-screen";
import Layout from "./screens/layout";
import ErrorRouterScreen from "./screens/error-router-screen";

//react-router-dom을 활용한 Page 관리
//- Page : home, profile, signin, signup
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <Layout />
      </ProtectedRouter>
    ),
    errorElement: <ErrorRouterScreen />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SigninScreen />,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
  },
  {
    path: "/signup-ex",
    element: <SignupScreenEx />,
  },
]);

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const isLogin = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    //초기화
    //
    isLogin();
  }, []);
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container className="App">
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
}

export default App;

//전체 css스타일을 RESET
const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color: white;
    color: black;
  }
`;
