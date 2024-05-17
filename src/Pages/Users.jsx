import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Button, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Switch } from "@nextui-org/react";
import { jwtDecode } from 'jwt-decode';

const Users = () => {
    const { isOpen: isMainModalOpen, onOpen: onMainModalOpen, onOpenChange: onMainModalOpenChange } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onOpenChange: onEditModalOpenChange } = useDisclosure();
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isSelected, setIsSelected] = React.useState(true);

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
                setFilteredUsers(data);
            })
            .catch(error => {
                console.error("Error al obtener usuarios:", error);
            });
    }, []);

    const getAllUsers = async (token) => {
        try {
            const response = await fetch('https://itacaapi-puw8.onrender.com/api/users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
            });
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
        setSelectedUser(user);
        onMainModalOpen();
    };

    const openEditModal = () => {
        onEditModalOpen();
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase(); // Convertir a minúsculas para la comparación
        setSearchQuery(query);
        const filtered = users.filter(
            (user) =>
                user.username.toLowerCase().includes(query) || // Puedes agregar más campos aquí para la búsqueda
                user.email.toLowerCase().includes(query) ||
                user.role.name.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
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
                <div className="w-full flex justify-center p-3">
                    <Input
                        placeholder="Buscar usuarios..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="w-full gap-5 p-3 grid grid-cols-2 sm:grid-cols-4">
                    {filteredUsers.map(user => (
                        <div key={user.id} className="flex justify-around bg-gray-200 p-2 rounded-xl items-center">
                            <User name={user.username} description={user.role.name}
                            //  avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }} 
                             />
                            <Button color='primary' onPress={() => openUserDetails(user)}>Detalles</Button>
                        </div>
                    ))}
                </div>
            </div>
            <Modal isOpen={isMainModalOpen} onOpenChange={onMainModalOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detalles del Usuario</ModalHeader>
                            <ModalBody>
                                <p>Username: {selectedUser?.username}</p>
                                <p>Email: {selectedUser?.email}</p>
                                <p>Role: {selectedUser?.role.name}</p>
                                <p>CC: {selectedUser?.numDni}</p>
                                <p>State: {selectedUser?.state}</p>
                                <Button color="secondary" onPress={openEditModal}>
                                    Manage
                                </Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isEditModalOpen} onOpenChange={onEditModalOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Gestionar Usuario</ModalHeader>
                            <ModalBody>
                                {selectedUser && (
                                    <>
                                        <div className="mb-3">
                                            <label htmlFor="username">Username:</label>
                                            <Input
                                                fullWidth
                                                type="text"
                                                id="username"
                                                value={selectedUser.username}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email">Email:</label>
                                            <Input
                                                fullWidth
                                                type="email"
                                                id="email"
                                                value={selectedUser.email}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="role">Role:</label>
                                            <Input
                                                fullWidth
                                                type="text"
                                                id="role"
                                                value={selectedUser.role.name}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cc">CC:</label>
                                            <Input
                                                fullWidth
                                                type="text"
                                                id="cc"
                                                value={selectedUser.numDni}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                <Switch
                                    isSelected={isSelected}
                                    onValueChange={(value) => {
                                        const shouldProceed = window.confirm('¿Estás seguro de cambiar el estado?');
                                        if (shouldProceed) {
                                            setIsSelected(value);
                                        }
                                    }}
                                    color="success"
                                >
                                    State
                                </Switch>
                                <p className="text-small text-default-500">Selected: {isSelected ? "active" : "inactive"}</p>
                            </div>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </main>
    );
};

export default Users;
