import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';


const Users = () => {
  const [token, setToken] = useState([]);
  const [id, setUserId] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.setItem('token');
    if (storedToken) {
        setToken(storedToken);
        const decodedToken = jwtDecode(storedToken);
        setUserId(decodedToken.userId);
    }
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://itacaapi-ap2d.onrender.com/api/user/getAllUsers');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.log('Error al obtener la lista de usuarios');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1>List of Users</h1>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>NumDni: {user.numDni}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
