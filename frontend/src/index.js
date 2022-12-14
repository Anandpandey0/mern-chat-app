import React from "react";

import "./index.css";

import App from "./App";
import {createRoot} from 'react-dom/client';
// import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
// import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
    <ChatProvider>
  <ChakraProvider>
      <App />
</ChakraProvider>
    </ChatProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();