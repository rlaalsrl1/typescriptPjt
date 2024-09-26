import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./screens/home";
import Profile from "./screens/Profile";
import SigninScreen from "./screens/signin-screen";
import SignupScreen from "./screens/signup-screen";
import SignupScreenEx from "./screens/signup-screen-ex";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

//react-router-dom을 활용한 Page 관리
//- Page : home, profile, signin, signup
const router = createBrowserRouter([
  {
    path: "/",
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
  width: 100vm;
  height: 100vh;
`;

function App() {
  return (
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
    background-color: black;
    color: white;
  }
`;
