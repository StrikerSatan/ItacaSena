import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoCloseOutline } from "react-icons/io5";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const socket = io('/');

const Chat = ({ isOpen, onClose, projectData }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://itacaapi-puw8.onrender.com/api/chats/66440c82e8eb8b58a6076510/message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessages(data);
        scrollToBottom();
      } else {
        console.error('Error al recibir los mensajes');
      }
    } catch (error) {
      console.error('Error al recibir los mensajes:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await fetch('https://itacaapi-puw8.onrender.com/api/chats/66440c82e8eb8b58a6076510/message/6642dc7dd4e9a32e2277680d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        const data = await response.json();
        socket.emit('message', data);
        setMessage('');
        setMessages(prevMessages => [...prevMessages, data]);
        scrollToBottom();
        fetchMessages();
      } else {
        console.error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleEditMessage = (id) => {
    const messageToEdit = messages.find(msg => msg._id === id);
    if (messageToEdit) {
      setEditingMessage(messageToEdit);
    }
  };

  const saveEditMessage = async () => {
    if (editingMessage) {
      try {
        const response = await fetch(`https://itacaapi-puw8.onrender.com/api/chats/66440c82e8eb8b58a6076510/message/${editingMessage._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: editingMessage.message,
          }),
        });

        if (response.ok) {
          console.log('Mensaje editado con éxito');
          fetchMessages();
          setEditingMessage(null);
        } else {
          console.log('Error al editar el mensaje');
        }
      } catch (error) {
        console.error('Error al editar el mensaje:', error);
      }
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`https://itacaapi-puw8.onrender.com/api/chats/66440c82e8eb8b58a6076510/message/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setMessages(prevMessages => prevMessages.filter(msg => msg._id !== id));
      } else {
        console.error('Error al eliminar el mensaje');
      }
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(myFunction, 1000);
  
    socket.on('message', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
      scrollToBottom();
    });
  
    return () => {
      clearInterval(intervalId);
      socket.off('message');
    };
  }, []);
  
  function myFunction() {
    fetchMessages();
  }

  return (
    <div className={`border border-black fixed bottom-0 right-0 bg-white text-black max-w-[400px] ${isOpen ? 'block' : 'hidden'}`} style={{ maxWidth: '400px' }}>
      <div className='p-4 flex flex-col'>
        <div className='bg-black p-2 rounded-md flex justify-between items-center'>
          <h1 className='text-2xl font-bold my-2 text-white'>Chat</h1>
          <button onClick={onClose} className='text-5px m-2 text-white index[999]'><IoCloseOutline /></button>
        </div>

        <div className="messages-list-container max-h-96 overflow-y-auto scrollbar-hide" >
          <ul className="messages-list flex-1" style={{ overflowY: 'auto', paddingRight: '15px' }}>
            {messages.map((msg) => (
              <li key={msg._id} className={`my-2 p-2 table w-48 min-w-48 rounded-md ${msg._id === 'Yo' ? 'bg-sky-700' : 'bg-black ml-auto'}`}>
                <p className='text-red text-[8px] text-white underline'>{msg.senderName}</p>
                <span className='text-xs text-slate-300 block break-all'>{msg.message}</span>
                <div className='flex justify-between items-center'>
                  <div className="">
                    <button onClick={() => handleEditMessage(msg._id)} className='text-blue-500 mr-1'><FaEdit className='text-[10px]' /></button>
                    <button onClick={() => handleDeleteMessage(msg._id)} className='text-red-500'><FaTrash className='text-[10px]' /></button>
                  </div>
                  <p className='text-[8px] text-slate-300 block'>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="text" placeholder='Mensaje' value={message} onChange={(e) => setMessage(e.target.value)} className='text-black mr-2' />
          <Button color="primary" variant="faded" type='submit' onClick={sendMessage} className='flex flex-wrap gap-4 items-center'>Enviar</Button>
        </div>
      </div>

      {editingMessage && (
        <Modal isOpen={Boolean(editingMessage)} onClose={() => setEditingMessage(null)}>
          <ModalContent>
            <ModalHeader>Editar Mensaje</ModalHeader>
            <ModalBody>
              <Input type="text" value={editingMessage.message} onChange={(e) => setEditingMessage({ ...editingMessage, message: e.target.value })} />
            </ModalBody>
            <ModalFooter>
              <Button onClick={saveEditMessage}>Guardar</Button>
              <Button color="error" onClick={() => setEditingMessage(null)}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default Chat;
