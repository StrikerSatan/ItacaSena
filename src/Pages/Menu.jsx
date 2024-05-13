import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea } from "@nextui-org/react";
import Modalperfil from "./Modals/Perfil";
// Componente para crear un nuevo proyecto
function CrearProyecto({ isOpen, onClose }) {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearProyecto = () => {
    // Aquí puedes manejar la lógica para crear un nuevo proyecto con el nombre y la descripción ingresados
    console.log("Nombre del Proyecto:", nombreProyecto);
    console.log("Descripción del Proyecto:", descripcion);
    // Cierra el modal después de crear el proyecto
    onClose();
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Crear Proyecto</ModalHeader>
        <ModalBody>
          <Input
            isRequired
            label="Nombre del Proyecto"
            labelPlacement="outside"
            placeholder="Ingrese el nombre del proyecto"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
          />
          <Textarea
            isRequired
            label="Descripción"
            labelPlacement="outside"
            placeholder="Ingrese la descripción del proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          {/* Otras entradas de datos aquí */}
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

// Componente para la nueva barra de carga personalizada
function CustomProgressBar({ percentage }) {
  const getBarColor = (percentage) => {
    if (percentage <= 50) {
      // Rojo a amarillo
      const hue = 20 + percentage * 1.6; // Ajusta la tonalidad de color de rojo a amarillo
      return `hsl(${hue}, 70%, 70%)`; // Utiliza HSL para definir el color con menor saturación y brillo
    } else {
      // Amarillo a verde
      const hue = (percentage - 50) * 1.6; // Ajusta la tonalidad de color de amarillo a verde
      return `hsl(${hue + 40}, 70%, 70%)`; // Utiliza HSL para definir el color con menor saturación y brillo
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "8px",
        backgroundColor: "#ddd",
        borderRadius: "4px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: getBarColor(percentage),
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
}

export default function MenuPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateProject = () => {
    // Aquí puedes agregar la lógica para crear un nuevo proyecto
    console.log("Proyecto creado");
    // Cierra la modal después de crear el proyecto
    closeModal();
  };

  const list = [
    {
      title: "Orange",
      img: "/Image/aaa.jpg",
      secondaryText: "Sweet and juicy",
      percentage: 100,
    },
    {
      title: "Tangerine",
      img: "/Image/sherry-christian-8Myh76_3M2U-unsplash.jpg",
      secondaryText: "Fresh and tangy",
      percentage: 20,
    },
    {
      title: "Apple",
      img: "/Image/bbb.jpg",
      secondaryText: "Crisp and refreshing",
      percentage: 5,
    },
    {
      title: "Banana",
      img: "/Image/ccc.jpg",
      secondaryText: "Soft and sweet",
      percentage: 10,
    },
  ];

  // Filtrar la lista por nombre y secondaryText
  const filteredList = list.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.secondaryText.toLowerCase().includes(searchText.toLowerCase())
  );
    // ----------Modal chat----
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModalperfil = () => {
      setIsModalOpen(!isModalOpen);
    };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Input
          label="Filtrar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          width="250px"
          className="mr-4"
        />
        <Button color="danger" onClick={openModal}>
          Crear Proyecto
        </Button>
        <Button color="danger" onClick={toggleModalperfil}>
        <i className="fas fa-user"></i>
        </Button>
      </div>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4">
        {filteredList.map((item, index) => (
          <div key={index} style={{ minWidth: "200px" }}>
            <a href="http://localhost:5173/proyecto">
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
                  />
                </CardBody>
                <CardFooter className="text-small flex flex-col items-start">
                  <div className="flex justify-between w-full">
                    <div>
                      <b>{item.title}</b>
                    </div>
                    <span className="text-default-700">{item.secondaryText}</span>
                  </div>

                  {/* Utilizamos la nueva barra de carga personalizada */}
                  <CustomProgressBar percentage={item.percentage} />
                </CardFooter>
              </Card>
            </a>
          </div>
        ))}
      </div>

      {/* Modal para crear proyecto */}
      <CrearProyecto isOpen={showModal} onClose={closeModal} />
      <Modalperfil isOpen={isModalOpen} onClose={toggleModalperfil}>
        <h1>Holi</h1>
      </Modalperfil>
    </div>
  );
}
