import { useEffect, useState } from 'react';
import Gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import axios from 'axios';

const GanttChart = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Gantt.config.xml_date = '%Y-%m-%d';
        Gantt.init('gantt_here');

        const [actividadesRes, tareasRes] = await Promise.all([
          axios.get('https://itacaapi-ap2d.onrender.com/api/users/Actividades'),
          axios.get('https://itacaapi-ap2d.onrender.com/api/users/tareas')
        ]);

        const actividades = actividadesRes.data.map(actividad => ({
          id: actividad._id,
          text: actividad.name,
          start_date: actividad.fechainicioActividad,
          duration: Math.ceil((new Date(actividad.fechafinActividad) - new Date(actividad.fechainicioActividad)) / (1000 * 60 * 60 * 24)),
          progress: actividad.estadoactividad === 'Completada' ? 100 : 0,
          parent: null,
        }));

        const tareas = tareasRes.data.map(tarea => ({
          id: tarea._id,
          text: tarea.nombretarea,
          start_date: tarea.fechainicioTarea,
          duration: Math.ceil((new Date(tarea.fechafinTarea) - new Date(tarea.fechainicioTarea)) / (1000 * 60 * 60 * 24)),
          progress: tarea.estadotarea === 'Completada' ? 100 : 0,
          parent: tarea.idactividad,
        }));

        const tasks = [...actividades, ...tareas];
        Gantt.parse({ data: tasks });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div id="gantt_here" style={{ width: '100%', height: '500px' }} />
      )}
    </div>
  );
};

export default GanttChart;
