import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    const getAllUsers = async (token) => {
        try {
            const response = await fetch('https://itacaapi-puw8.onrender.com/api/users/', {
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
        } catch (error) {
            console.error(error);
        }
    }
    const UserDetailsModal = ({ user }) => (
        <div className="user-details-modal">
            <h2>Detalles del Usuario</h2>
            <div className="user-info">
                <div className="info-label">Nombre:</div>
                <div className="info-value">{user.username}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Email:</div>
                <div className="info-value">{user.email}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Rol:</div>
                <div className="info-value">{user.role.name}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Número de Identificación:</div>
                <div className="info-value">{user.numDni}</div>
            </div>
            <div className="user-info">
                <div className="info-label">Estado:</div>
                <div className={`info-value ${user.enabled ? 'enabled' : 'disabled'}`}>
                    {user.enabled ? 'Habilitado' : 'Inhabilitado'}
                </div>
            </div>
            <div className="button-group">
                <button onClick={() => toggleEnableUser(user.id, user.enabled)} className={`action-button ${user.enabled ? 'disable' : 'enable'}`}>
                    {user.enabled ? 'Inhabilitar' : 'Habilitar'}
                </button>
                <button onClick={() => setShowModal(false)} className="action-button">Cerrar</button>
            </div>
        </div>

    );

    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="users-container">
            <Link to="/admin">
                <button className="back-button">
                <i className='fas fa-arrow-left'></i>
                </button>
            </Link>
            
            <h1>Listado de Usuarios</h1>
            <br />
            <div className="user-grid">
                {users.map(user => (
                    <div key={user.id} className="user-item">
                        <h3>{user.username}</h3>
                        <p>Rol: {user.role.name}</p>
                        <button onClick={() => { setSelectedUser(user); setShowModal(true); }}>
                            Detalles
                        </button>
                    </div>
                ))}
            </div>
            {showModal && selectedUser && <UserDetailsModal user={selectedUser} />}
        </div>
    );
};

export default Users;
