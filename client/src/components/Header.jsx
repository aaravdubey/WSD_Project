import { useState } from "react";
import Logo from "../assets/codecampus-logo/svg/logo-no-background.svg";
import { useNavigate } from "react-router-dom";

const Header = ({searchInp, handleSearch}) => {
  const navigate = useNavigate();

  async function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  }

  return <header className="p-3 text-white shadow sticky-top">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between mx-5">
        <a href="/home" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img className="logo me-5" src={Logo}></img>
        </a>
        <div className="d-flex">
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" onChange={handleSearch} value={searchInp} />
          </form>

          <div className="text-end">
            
              <div className="dropdown">
                <button className="btn secondary-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem('name') && localStorage.getItem('name').split(' ')[0]}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark p-0 overflow-hidden ">
                  <li><a className="dropdown-item" href="/myvideos">My Videos</a></li> 
                  <hr className="dropdown-hr" />
                  {/* <li><a className="dropdown-item" href="#">Saved Videos</a></li>
                  <hr className="dropdown-hr"/> */}
                  <li><a className="dropdown-item" href="/upload">Upload Video</a></li>
                  <hr className="dropdown-hr"/>
                  <li><a className="dropdown-item bg-danger" href="#" onClick={logout}>Logout</a></li>
                </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  </header>
}

export default Header;