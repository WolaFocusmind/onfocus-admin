import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/svg/logo-small.svg";
import { getCookie } from "../../helpers/session";

const Sidebar = () => {
  return (
    <nav className="sidebar mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar">
      <div className="sidebar-header">
        <h3>
          <img src={Logo} alt="Logo de Focus Mind" />
        </h3>
      </div>

      <ul>
        {getCookie("role") === "0" && (
          <NavLink activeClassName="active" to="/courses">
            <li>Cursos</li>
          </NavLink>
        )}

        {getCookie("role") === "0" && (
          <NavLink activeClassName="active" to="/categories">
            <li>Categorías</li>
          </NavLink>
        )}

        {getCookie("role") === "0" && (
          <NavLink activeClassName="active" to="/teachers">
            <li>Profesores</li>
          </NavLink>
        )}

        <NavLink activeClassName="active" to="/students">
          <li>Alumnos</li>
        </NavLink>

        {getCookie("role") === "0" && (
          <NavLink activeClassName="active" to="/trash">
            <li>Papelera</li>
          </NavLink>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
