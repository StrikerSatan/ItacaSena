import { useEffect } from "react";
import GanttChart from "../Components/Gantt";

function Home() {
  useEffect(() => {
    // Código para cargar datos o configuraciones adicionales si es necesario
  }, []);

  return (
    <div>
      <GanttChart />
    </div>
  );
}

export default Home;
