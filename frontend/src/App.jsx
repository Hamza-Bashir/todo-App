import React from "react";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/signInPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import TodoPage from "./pages/TodoPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
