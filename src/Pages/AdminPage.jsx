import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@nextui-org/react';

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Supongo que obtienes el token de alguna manera

      try {
        const usersResponse = await fetch('https://itacaapi-puw8.onrender.com/api/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
        });
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          setTotalUsers(usersData.length);
        } else {
          console.error("Error al obtener usuarios:", await usersResponse.text());
        }

        const projectsResponse = await fetch('https://itacaapi-puw8.onrender.com/api/projects/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
        });
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setTotalProjects(projectsData.length);
        } else {
          console.error("Error al obtener proyectos:", await projectsResponse.text());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>Welcome, Administrator</h1>
        <p>Manage users and projects easily!</p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex justify-around items-center p-2">
          <div className="card" style={{ width: '300px', textAlign: 'center' }}>
            <Card shadow>
            <h2 style={{ marginBottom: '10px', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Total Users</h2>
              <p style={{ fontSize: '18px' }}>{totalUsers}</p>
              <img src="/Image/itaca2.png" alt="User Icon" style={{ width: '100px', height: '100px', margin: '0 auto' }} />
            </Card>
          </div>
          <div className="card" style={{ width: '300px', textAlign: 'center' }}>
            <Card shadow>
            <h2 style={{ marginBottom: '10px', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Total Projects</h2>
              <p style={{ fontSize: '18px' }}>{totalProjects}</p>
              <img src="/Image/itaca2.png" alt="Project Icon" style={{ width: '100px', height: '100px', margin: '0 auto' }} />
            </Card>
          </div>
        </div>
        <div className="w-full flex justify-around items-center p-2">
          <Button color="secondary" variant="shadow">
            <Link to="/users">View Users</Link>
          </Button>
          <Button color="primary" variant="shadow">
            <Link to="/menu">View Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
