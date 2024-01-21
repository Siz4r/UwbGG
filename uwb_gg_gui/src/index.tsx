import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {ErrorPage} from "./core/wrappers/ErrorPage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ChatPage} from "./views/ChatPage/ChatPage";
import {Login} from "./views/LoginPage/Login";
import {UserInfo} from "./views/UserInfo/UserInfo";
import {RegisterPage} from "./views/Register/RegisterPage";
import {Provider} from "react-redux";
import {store} from "./store/store";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "*",
    element: <ChatPage />,
    errorElement: <ErrorPage />
  },
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
]);

root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
