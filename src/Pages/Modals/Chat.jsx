import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const socket = io('/');

const Chat = ({ isOpen, onClose, projectData }) => {
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://itacaapi-puw8.onrender.com/api/chats/66440c82e8eb8b58a6076510/message/6642dc7dd4e9a32e2277680d`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        socket.emit('message', message);
        console.log('Mensaje enviado con éxito:', data);
        setMessage('');

        setMessages(prevMessages => [...prevMessages, data]);

        recibeMessages();
      } else {
        console.log('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };



  const recibeMessages = async () => {
    try {
      const response = await fetch('https://itacaapi-puw8.onrender.com/api/chats/66440c82e8eb8b58a6076510/message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        scrollToBottom();
        console.log('Mensajes recibidos exitosamente:', data);
      } else {
        console.log('Error al recibir los mensajes');
      }
    } catch (error) {
      console.error('Error al recibir los mensajes:', error);
    }
  };

  useEffect(() => {
    recibeMessages();

    socket.on('message', (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
      scrollToBottom();
      recibeMessages();
    });

    return () => {
      socket.off('message');
    };
  }, []);


  const handleEditMessage = async (id) => {
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
        console.log('Mensaje eliminado con éxito');
        recibeMessages();
      } else {
        console.log('Error al eliminar el mensaje');
      }
    } catch (error) {
      console.error('Error al eliminar el mensaje:', error);
    }
  };

  return (
    <div className={`border border-black fixed bottom-0 right-0 bg-white text-white ${isOpen ? 'block' : 'hidden'}`} style={{ maxWidth: '400px' }}>
      <button onClick={onClose} className='text-5px absolute top-0 right-0 m-2 text-black'>Cerrar Chat</button>
      <div className='p-10 flex flex-col'>
        <div className={`bg-black p-2 rounded-md`}>
          <h1 className='text-2xl font-bold my-2 text-white'>Chat</h1>
        </div>

        <div className="messages-list-container max-h-96 overflow-y-auto" >
          <ul className="messages-list flex-1" style={{ overflowY: 'auto', paddingRight: '15px' }}>
            {messages.map((message) => (
              <li key={message._id} className={`my-2 p-2 table rounded-md ${message._id === 'Yo' ? 'bg-sky-700' : 'bg-black ml-auto'}`}>
                <span className='text-xs text-slate-300 block'>{message.message}</span>
                <span className='text-xs text-slate-300 block'>{new Date(message.createdAt).toLocaleString()}</span> {/* Formatea la fecha aquí */}
                <span className='text-md message-body'>{message.body}</span>
                <div className='flex'>
                  <button onClick={() => handleEditMessage(message._id)} className='text-blue-500 mr-2'><FaEdit /></button>
                  <button onClick={() => handleDeleteMessage(message._id)} className='text-red-500'><FaTrash /></button>
                </div>
              </li>
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="text" placeholder='Mensaje' value={message} onChange={(e) => setMessage(e.target.value)} className='text-black mr-2' />

          <Button color="primary" variant="faded" type='submit' onClick={handleSubmit} className='flex flex-wrap gap-4 items-center'>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
