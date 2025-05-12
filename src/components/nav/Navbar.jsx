import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles.css"

const Navbar = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleCategoriaChange = (categoria) => {
    navigate(`/publicaciones?category=${categoria}`);
    setMenuVisible(false);
  };

  const handleCursoChange = (curso) => {
    navigate(`/publicaciones?course=${curso}`);
    setMenuVisible(false);
  };

  const handleGeneralChange = () => {
    navigate(`/publicaciones`);
    setMenuVisible(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="hamburger-icon" onClick={toggleMenu}>
          ☰
        </div>

        {menuVisible && (
          <div className="navbar-menu dark-left">
            <span className="nav-button" onClick={handleGeneralChange}>Inicio</span>

            <div className="nav-button dropdown">
              <span>Categorías</span>
              <ul className="dropdown-content">
                <li onClick={() => handleCategoriaChange('Web Development')}>Web Development</li>
                <li onClick={() => handleCategoriaChange('Infographics')}>Infographics</li>
                <li onClick={() => handleCategoriaChange('Presentation')}>Presentation</li>
                <li onClick={() => handleCategoriaChange('Artificial Intelligence')}>Artificial Intelligence</li>
              </ul>
            </div>

            <div className="nav-button dropdown">
              <span>Cursos</span>
              <ul className="dropdown-content">
                <li onClick={() => handleCursoChange('Technology')}>Technology</li>
                <li onClick={() => handleCursoChange('Taller')}>Taller</li>
                <li onClick={() => handleCursoChange('Practica Supervisada')}>Práctica Supervisada</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
