import React from "react";
import IconSearch from "../../assets/img/svg/icon-search.svg";
import { logout } from "../../helpers/session";

const Navbar = ({search, type, display}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    logout();
  };
  
  const handleChangeInputSearch = (e) => {
    search(e.target.value)
  }

  return (
    <nav className="navbarOptions navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav ml-auto columnUl">
            <li className="nav-item">
              <button onClick={handleSubmit} className="logout">
                Cerrar sesión
              </button>
            </li>
            {display && <li className="nav-item">
              <div className="inner-addon right-addon">
                <img
                  src={IconSearch}
                  className="glyphicon glyphicon-search"
                  alt={`Buscar ${type}`}
                />
                <input
                  type="text"
                  className="searchInput"
                  onChange={(e) => handleChangeInputSearch(e)}
                  placeholder={`Buscar ${type}`}
                />
              </div>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
