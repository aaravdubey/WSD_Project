import { useEffect, useState } from "react";
import Logo from "../assets/codecampus-logo/svg/logo-no-background.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return <footer className="shadow py-2 navy-color">
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-5 margin-0">
        <p className="col-md-4 mb-0 text-white">© 2023 CodeCampus, Inc</p>


        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><a href="/home" className="nav-link px-2 text-white">Home</a></li>
          <li className="nav-item"><a href="/upload" className="nav-link px-2 text-white">Upload</a></li>
          <li className="nav-item"><a href="/saved" className="nav-link px-2 text-white">Saved Videos</a></li>
          <li className="nav-item"><a href="/myvideos" className="nav-link px-2 text-white">Your Videos</a></li>
        </ul>
      </footer>
    </div>
  </footer>
}

export default Footer;