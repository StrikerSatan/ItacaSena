import React, { useState } from "react";
import { Listbox, ListboxItem, Button } from "@nextui-org/react";
import Dashboard from "../Components/proyectoComponentes/Dashboard";
import Gantt from "../Components/proyectoComponentes/Gantt";
import Observaciones from "../Components/proyectoComponentes/Observaciones";
import EditarProyecto from "../Components/proyectoComponentes/EditarProyecto";

export default function Proyecto() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSectionChange = (section) => {
    if (section === "menu") {
      window.location.href = "/menu"; // Redireccionar a la página de menú
    } else {
      setActiveSection(section);
    }
  };

  const renderComponent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "gantt":
        return <Gantt />;
      case "observaciones":
        return <Observaciones />;
      case "editarproyecto":
        return <EditarProyecto />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex">
      {/* Sidebar */}
      <div className="mr-8 w-48 p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium">
        <Listbox
          aria-label="User Menu"
          className="p-0"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
          onAction={(key) => handleSectionChange(key)}
        >
          <ListboxItem key="dashboard" selected={activeSection === "dashboard"}>
            Dashboard
          </ListboxItem>
          <ListboxItem key="gantt" selected={activeSection === "gantt"}>
            Gantt
          </ListboxItem>
          <ListboxItem
            key="observaciones"
            selected={activeSection === "observaciones"}
          >
            Observaciones
          </ListboxItem>
          {/* Agregar el botón "Editar proyecto" aquí */}
          
          <ListboxItem key="editarproyecto" selected={activeSection === "editarproyecto"}>
            Editar proyecto
          </ListboxItem>
          <ListboxItem key="menu">Volver</ListboxItem>
        </Listbox>
      </div>
      {/* Contenido */}
      <div className="flex-grow">{renderComponent()}</div>
    </div>
  );
}
