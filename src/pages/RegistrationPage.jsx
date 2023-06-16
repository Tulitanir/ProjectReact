import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../utils/Auth";
import Utils from "../utils/Utils";

function RegistrationPage() {
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/loginPage");
  };

  const resetForm = () => {
    setName("");
    setSurname("");
    setPhone("");
    setEmail("");
    setPassword("");
  };

  let handleNameChange = (e) => {
    setName(e.target.value);
  };

  let handleSurameChange = (e) => {
    setSurname(e.target.value);
  };

  let handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  let handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  let handleImageChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const { height, width } = image;
        if (Math.abs(height / width - 1) > 0.01) {
          alert("Соотношение сторон изображения должно быть 1:1");
          event.target.form.reset();
          setImage(null);
          return;
        }
      };
    };

    setImage(file);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);

    const data = await Authentication.registrationRequest(formData);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.member));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("expiresIn", data.expiresIn);
      handleRedirect();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Имя:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </label>
          <br />
          <label>
            Фамилия:
            <input
              type="text"
              value={surname}
              onChange={handleSurameChange}
              required
            />
          </label>
          <br />
          <label>
            Номер телефона:
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </label>
          <br />
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
          <label>
            Картинка профиля:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <br />
          <button className="login-button" type="submit">
            Зарегистрироваться
          </button>
          <br />
          <br />
          <button className="login-button" type="reset" onClick={resetForm}>
            Очистить форму
          </button>
        </form>
        <Link to="/loginPage">
          <p>Уже зарегистрированы?</p>
        </Link>
      </div>
    </div>
  );
}

export default RegistrationPage;
