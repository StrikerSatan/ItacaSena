import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "En Proceso", tareas: 15 },
  { name: "Pendientes", tareas: 8 },
  { name: "Hechas", tareas: 20 }
];

const equipoData = [
  { nombre: "Juan Perez", rol: "Desarrollador", tareasAsignadas: 12, tareasCompletadas: 8 },
  { nombre: "María Rodríguez", rol: "Diseñadora", tareasAsignadas: 10, tareasCompletadas: 6 },
  { nombre: "Carlos García", rol: "Tester", tareasAsignadas: 15, tareasCompletadas: 10 }
];

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nombre del proyecto</h1>

      {/* Diagrama de barras */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Tareas por Estado</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tareas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tarjetas con información del equipo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {equipoData.map((miembro, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">{miembro.nombre}</h2>
            <p>Rol: {miembro.rol}</p>
            <p>Tareas Asignadas: {miembro.tareasAsignadas}</p>
            <p>Tareas Completadas: {miembro.tareasCompletadas}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
