import React from "react";
import { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Accordion, AccordionItem, Input } from "@nextui-org/react";

// Componente para crear una nueva observación
function CrearObservacion({ isOpen, onClose }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleCrearObservacion = () => {
    // Aquí puedes manejar la lógica para crear una nueva observación con el nombre y la descripción ingresados
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    // Cierra el modal después de crear la observación
    onClose();
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Nueva Observación</ModalHeader>
        <ModalBody>
          <Input
            isRequired
            label="Título"
            labelPlacement="outside"
            placeholder="Ingrese el título"
          />
          <Textarea
            isRequired
            label="Descripción"
            labelPlacement="outside"
            placeholder="Ingrese su descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="error" variant="light" onPress={onClose}>
            Cerrar
          </Button>
          <Button color="primary" onPress={handleCrearObservacion}>
            Crear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Componente para listar las observaciones
function ListarObservaciones() {
  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <Accordion variant="splitted" className="w-full">
      <AccordionItem key="1" aria-label="Observación 1" title="Observación 1" defaultOpened>
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Observación 2" title="Observación 2" defaultOpened>
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Observación 3" title="Observación 3" defaultOpened>
        {defaultContent}
      </AccordionItem>
    </Accordion>
  );
}

export default function Proyecto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button color="success" onClick={openModal}>
          Nueva Observación
        </Button>
      </div>
      <CrearObservacion isOpen={isModalOpen} onClose={closeModal} />
      <ListarObservaciones />
    </div>
  );
}
