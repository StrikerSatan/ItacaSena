// Sidebar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "Ocultar" : "Mostrar"}
      </button>
      <ul>
        <li>
          <Link to="/home">Users</Link>
        </li>
        <li>
          <Link to="/chats">Chats</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        {/* Agrega más elementos según las secciones de tu aplicación */}
      </ul>
    </div>
  );
};

export default Sidebar;
