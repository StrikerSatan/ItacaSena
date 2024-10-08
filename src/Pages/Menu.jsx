import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea } from "@nextui-org/react";
import Modalperfil from "./Modals/Perfil";
import { useNavigate } from 'react-router-dom';
import '../../src/Css/menu.css'; // Asegúrate de importar tu archivo de estilos CSS

function CrearProyecto({ isOpen, onClose }) {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearProyecto = () => {
    console.log("Nombre del Proyecto:", nombreProyecto);
    console.log("Descripción del Proyecto:", descripcion);
    onClose();
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Crear Proyecto</ModalHeader>
        <ModalBody>
          <Input isRequired label="Nombre del Proyecto" labelPlacement="outside" placeholder="Ingrese el nombre del proyecto" value={nombreProyecto} onChange={(e) => setNombreProyecto(e.target.value)} />
          <Textarea isRequired label="Descripción" labelPlacement="outside" placeholder="Ingrese la descripción del proyecto" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleCrearProyecto}>
            Crear Proyecto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function CustomProgressBar({ percentage }) {
  const getBarColor = (percentage) => {
    if (percentage <= 50) {
      const hue = 20 + percentage * 1.6; // Ajusta la tonalidad de color de rojo a amarillo
      return `hsl(${hue}, 70%, 70%)`; // Utiliza HSL para definir el color con menor saturación y brillo
    } else {
      const hue = (percentage - 50) * 1.6; // Ajusta la tonalidad de color de amarillo a verde
      return `hsl(${hue + 40}, 70%, 70%)`; // Utiliza HSL para definir el color con menor saturación y brillo
    }
  };

  return (
    <div style={{ width: "100%", height: "8px", backgroundColor: "#ddd", borderRadius: "4px", position: "relative", overflow: "hidden", }} >
      <div style={{ width: `${percentage}%`, height: "100%", backgroundColor: getBarColor(percentage), transition: "width 0.3s ease", }} />
    </div>
  );
}

export default function MenuPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [token, setToken] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getAllProjects(storedToken)
        .then(data => {
          setProyectos(data);
        })
        .catch(error => {
          console.error("Error al obtener proyectos:", error);
        });
    }
  }, []);

  const getAllProjects = async (token) => {
    try {
      const response = await fetch("https://itacaapi-puw8.onrender.com/api/projects/", {
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
        console.error("Error al obtener proyectos:", response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectById = async (_id, token) => {
    try {
      const response = await fetch(`https://itacaapi-puw8.onrender.com/api/projects/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/proyecto', { state: { project: data } });
        return data;
      } else {
        console.error("Error al obtener proyectos:", response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewProject = (projectId) => {
    getProjectById(projectId, token);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateProject = () => {
    console.log("Proyecto creado");
    closeModal();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalperfil = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Input label="Filtrar" value={searchText} onChange={(e) => setSearchText(e.target.value)} width="250px" className="mr-4" />
        <Button color="danger" onClick={openModal}> Crear Proyecto </Button>
        <Button color="danger" onClick={toggleModalperfil}> <i className="fas fa-user"></i> </Button>
      </div>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
        {proyectos.map((project) => (
          <div key={project._id} style={{ minWidth: "300px" }}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => handleViewProject(project._id)}
              style={{ width: "300px", height: "auto" }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  alt={project.name}
                  className="object-cover w-full h-[140px]"
                  src={project.image}
                  style={{ width: "100%", height: "auto" }} // Asegura que la imagen ocupe todo el ancho de la tarjeta
                />
              </CardBody>
              <CardFooter className="text-small flex flex-col items-start p-4" style={{ gap: "8px" }}>
                <div className="w-full">
                  <div className="scroll-container" style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "10px" }}>
                    <span className="scroll-text">{project.name}</span>
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
                    {project.description}
                  </div>
                </div>
                <CustomProgressBar percentage={project.percentage} />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <CrearProyecto isOpen={showModal} onClose={closeModal} />
      <Modalperfil isOpen={isModalOpen} onClose={toggleModalperfil} />
    </div>
  );
}
