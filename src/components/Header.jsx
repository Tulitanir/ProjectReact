import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <header>
      <nav>
        <div className="container">
          <h1 className="text1">Open Fitness</h1>
          <NavLink to="/">ГЛАВНАЯ</NavLink>
          <NavLink to="/news">НОВОСТИ</NavLink>
          <NavLink to="/trainings">РАСПИСАНИЕ ГРУППОВЫХ ЗАНЯТИЙ</NavLink>
          {/* <a href="">КОМАНДА</a> */}
          <NavLink to="/programs">ПРОГРАММЫ ТРЕНИРОВОК</NavLink>
          <NavLink to="/subscriptions">АБОНЕМЕНТЫ</NavLink>
          <NavLink to="/loginPage">ВОЙТИ</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
