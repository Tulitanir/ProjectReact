import { useState, useEffect } from "react";
import Authentication from "../utils/Auth";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRedirect = (member) => {
    navigate("/profileInfo", { state: { user: JSON.stringify(member) } });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    const res = await Authentication.loginRequest(userData);
    if (res) {
      localStorage.setItem("user", JSON.stringify(res.member));
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      handleRedirect(res.member);
    }
  };

  return (
    <div className="login-page">
      <div>
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <br />
          <label>
            Пароль:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <br />
          <button type="submit">Войти</button>
        </form>
      </div>
      <Link to="/registrationPage">
        <p>Ещё не зарегистрированы?</p>
      </Link>
    </div>
  );
}

export default LoginPage;
