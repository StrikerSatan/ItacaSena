import React from 'react';
import '../Css/AdminPage.css'
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>Welcome, aaaaaaaaa</h1>
        <p>¡Manage users and projects easily!</p>
      </div>
      <div className="button-group">
        <Link to="/users" className="button">Users</Link>
        <Link to="/menu" className="button">Projects</Link>
      </div>
    </div>
  );
};

export default ManageUsers;
