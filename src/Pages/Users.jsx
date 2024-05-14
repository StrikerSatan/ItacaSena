import React, { useEffect, useState } from 'react';
import '../Css/Users.css'
import { jwtDecode } from 'jwt-decode';
const Users = () => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = jwtDecode(storedToken);
          setId(storedToken.id);
        }
        getAllUsers(storedToken)
                .then(data => {
                    setUsers(data);
                    
                })
                .catch(error => {
                    console.error("Error al obtener usuarios:", error);
                });

      })

      const getAllUsers = async(token) => {
        try {
            const response = await fetch ('https://itacaapi-ap2d.onrender.com/api/users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            })
           if (response.ok) {
                const data = await response.json();
                console.log(data);
                return data;
            } else {
                console.error("Error al obtener usuarios:", await response.text());
                throw new Error("Error al obtener usuarios");
            }
        } catch (error){
            console.error(error);
        }
      }


  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (

    <h1>Hi</h1>
  );
};

export default Users;
