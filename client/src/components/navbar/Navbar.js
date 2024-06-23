import React from "react";
import "./Navbar.css";
import toggler_mode from "../../assets/mode.jpg";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <div className="navbar block">
      <h1 className="flex text-2xl">DoNation</h1>

      <ul>
        <a href="/">
          <li>Home</li>
        </a>

        <a href="/DonorHome">
          <li>Donation</li>
        </a>

        <a href="Requestform">
          <li>Requests</li>
        </a>

        <a href="EventHome">
          <li>Events</li>
        </a>

        <a href="CareerHome">
          <li>Career</li>
        </a>

        <a href="/marketplace">
          <li>Marketplace </li>
        </a>
      </ul>

      <img
        onClick={() => {
          toggle_mode();
        }}
        src={toggler_mode}
        alt=""
        className="toggle-icon"
      />
    </div>
  );
};

export default Navbar;
