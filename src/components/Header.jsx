import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <header>
      <nav>
        <div className="container">
          <h1 className="text1">Open Fitness</h1>
          <NavLink to="/">ГЛАВНАЯ</NavLink>
          <NavLink to="/news">НОВОСТИ</NavLink>
          <a href="">РАСПИСАНИЕ ГРУППОВЫХ ЗАНЯТИЙ</a>
          <a href="">КОМАНДА</a>
          <a href="">АБОНЕМЕНТЫ</a>
          <a href="">КОНТАКТЫ</a>
          <NavLink to="/loginPage">ВОЙТИ</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
