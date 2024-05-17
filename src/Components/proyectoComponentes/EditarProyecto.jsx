import React, { useState } from "react";
import { Select, SelectItem, Avatar, Input, Textarea, Button } from "@nextui-org/react";
import { RangeCalendar } from "@nextui-org/react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/40" },
  { id: 4, name: "Jane Doe", email: "jane@example.com", avatar: "https://via.placeholder.com/40" },
  { id: 5, name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/40" },
  { id: 6, name: "Jane Doe", email: "jane@example.com", avatar: "https://via.placeholder.com/40" },
  // Otros usuarios...
];

export default function EditarProyecto() {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [encargado, setEncargado] = useState(null);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleEditarProyecto = () => {
    console.log("Nombre del Proyecto:", nombreProyecto);
    console.log("Descripción del Proyecto:", descripcion);
    console.log("Encargado del Proyecto:", encargado);
    console.log("Fecha de Inicio:", fechaInicio);
    console.log("Fecha de Fin:", fechaFin);
  };

  const handleRangeChange = (value) => {
    const [start, end] = value;
    setFechaInicio(start);
    setFechaFin(end);
  };

  // Función para deshabilitar las fechas anteriores a hoy
  const disabledDates = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer las horas a 00:00:00 para comparar solo la fecha
    return date < today;
  };

  return (
    <div>
      <Input
        label="Nombre del Proyecto"
        labelPlacement="outside"
        placeholder="Ingrese el nombre del proyecto"
        value={nombreProyecto}
        onChange={(e) => setNombreProyecto(e.target.value)}
        className="mb-4"
      />
      <Textarea
        label="Descripción"
        labelPlacement="outside"
        placeholder="Ingrese la descripción del proyecto"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="mb-4"
      />
      <Select
        items={users}
        label="Encargado"
        placeholder="Seleccione un encargado"
        labelPlacement="outside"
        className="max-w-xs mb-4"
        value={encargado}
        onChange={(value) => setEncargado(value)}
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.name}>
            <div className="flex gap-2 items-center">
              <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
              <div className="flex flex-col">
                <span className="text-small">{user.name}</span>
                <span className="text-tiny text-default-400">{user.email}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
      
      <Button color="primary" onClick={handleEditarProyecto}>Editar Proyecto</Button>
    </div>
  );
}
