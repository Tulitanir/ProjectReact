// import logo from "./logo.svg";
import React from "react";
import "./style/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";

import { Routes, Route } from "react-router-dom";
import NewsInfo from "./pages/NewsInfo";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfileInfo from "./pages/ProfileInfo";
import ProgramPage from "./pages/ProgramPage";
import TrainingPage from "./pages/TrainingPage";
import SubscriptionList from "./pages/SubscriptionsList";
import PaymentPage from "./pages/PaymentPage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/newsInfo" element={<NewsInfo />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/registrationPage" element={<RegistrationPage />} />
        <Route path="/profileInfo" element={<ProfileInfo />} />
        <Route path="/programs" element={<ProgramPage />} />
        <Route path="/trainings" element={<TrainingPage />} />
        <Route path="/subscriptions" element={<SubscriptionList />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="" element={<h1>Страница не найдена</h1>} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
