// import logo from "./logo.svg";
import React from "react";
import "./style/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage"

import { Routes, Route } from "react-router-dom";
import NewsInfo from "./pages/NewsInfo";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="" element={<h1>Страница не найдена</h1>} />
        <Route path="newsInfo" element={<NewsInfo />}/>
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
