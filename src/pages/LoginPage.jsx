import { useState, useEffect } from "react";
import Authentication from "../utils/Auth";
import { Link, useNavigate, useHistory } from "react-router-dom";
import "../style/loginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/profileInfo", { state: { user: user } });
    }
  }, []);

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
      localStorage.setItem("expiresIn", res.expiresIn);
      handleRedirect(res.member);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
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
          <button className="login-button" type="submit">
            Войти
          </button>
        </form>
        <Link to="/registrationPage">
          <p>Ещё не зарегистрированы?</p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
