import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";

const AppBar = () => {
  return (
    <header>
      <NavLink to="/"></NavLink>
      <Navigation />
    </header>
  );
};

export default AppBar;
