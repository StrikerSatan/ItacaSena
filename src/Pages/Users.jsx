import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import '../Css/Users.css'
import { User, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { jwtDecode } from 'jwt-decode';


const Users = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

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
    }, []); // Agrega un arreglo vacío para que useEffect solo se ejecute una vez

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

    const openUserDetails = (user) => {
        setSelectedUser(user); // Establecer el usuario seleccionado
        onOpen(); // Abrir la modal
    };

    return (
        <main>
            <div className="w-full flex flex-col justify-center items-center">
                <div className="w-full flex justify-between items-centerc p-2">
                    <Link to="/admin">
                        <button className="back-button">
                            <i className='fas fa-arrow-left'></i>
                        </button>
                    </Link>

                    <h1 className='font-bold text-black text-xl uppercase mb-5'>Listado de Usuarios</h1>
                    <p></p>
                </div>
                <div className="w-full gap-5 p-3 grid grid-cols-2 sm:grid-cols-4">
                    {users.map(user => (
                        <div key={user.id} className="flex justify-around bg-gray-200 p-2 rounded-xl items-center">
                            <User name={user.username} description={user.role.name} avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }} />
                            <Button color='primary' onPress={() => openUserDetails(user)}>Detalles</Button>
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalles del Usuario</ModalHeader>
                            <ModalBody>
                                <p>Username: {selectedUser.username}</p>
                                <p>Email. {selectedUser.email}</p>
                                <p>Role: {selectedUser.role.name}</p>
                                <p>CC: {selectedUser.numDni}</p>
                                <p>State: {selectedUser.state}</p>
                                
                                
                                
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>

    );
};

export default Users;
