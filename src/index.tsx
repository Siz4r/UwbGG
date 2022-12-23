import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ErrorPage } from "./core/wrappers/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatPage } from "./views/ChatPage/ChatPage";
import { Login } from "./views/LoginPage/Login";
import { UserInfo } from "./views/UserInfo/UserInfo";
import { RegisterPage } from "./views/Register/RegisterPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import {Friends} from "./views/Friends/Friends";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/chats",
    element: <ChatPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userinfo",
    element: <UserInfo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/friends",
    element: <Friends />,
    errorElement: <ErrorPage />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
