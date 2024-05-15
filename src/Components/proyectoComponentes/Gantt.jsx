import React, { useState } from "react";
import Modalchat from "../../Pages/Modals/Chat";
import Modal from 'react-modal';
import '../../Css/Actividades.css'
export default function Gantt() {


  // -----------Modales actividad--------

  // Estado para controlar la visibilidad de la nueva ventana modal
  const [isNewActivityModalOpen, setIsNewActivityModalOpen] = useState(false);

  // Función para abrir/cerrar la nueva ventana modal
  const toggleNewActivityModal = () => {
    setIsNewActivityModalOpen(!isNewActivityModalOpen);
  };
  // ----------Modal chat----
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalchat = () => {
    setIsModalOpen(!isModalOpen);
  };
  

  return (
    <>
      <div className="content">
      <h1 style={{ fontSize: '2em', color: '#000', margin: 0, padding: 0, textAlign: 'center' }}>Nombre del Proyecto</h1>
        <div className="horizontal-divs">
          <div style={{ flex: 0.25, backgroundColor: '#F6F1F1', border: '2px solid #B6A8A8', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            <div className="button-group">
              <h2>Actividades</h2>
              <button style={{margin: '3px', padding: '10px', cursor: 'pointer', border: '1px solid #000' }}onClick={toggleNewActivityModal}>Nueva Actividad</button>
            </div>
            <div className="existing-activities">
            {/* <div className="activity">Actividad 1</div> */}
              <div style={{ position: 'relative', padding: '10px', width: '300px', backgroundColor: '#F6F1F1' }}>Actividad 1</div>
              <div style={{ position: 'relative', padding: '10px', width: '300px', backgroundColor: '#B6A8A8' }}>Actividad 2</div>
              <div style={{ position: 'relative', padding: '10px', width: '300px', backgroundColor: '#F6F1F1' }}>Actividad 3</div>
              {/* Agrega más actividades según sea necesario */}
            </div>
          </div>
          <div className="div2">
            {/* Contenido del div2 */}
          </div>
        </div>
      </div>

      {/* Botón para abrir el modal */}
      <div style={{ color: 'black', padding: '5px', width: '84%', position: 'fixed', bottom: 0, right: 0, zIndex: 999, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ marginRight: '10px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer' }} onClick={toggleModalchat}><i className="far fa-comments"></i> Chat</div>
      </div>

      {/* Modal de chat */}
      <Modalchat isOpen={isModalOpen} onClose={toggleModalchat}>
        <h1>Holi</h1>
      </Modalchat>

      <Modal isOpen={isNewActivityModalOpen} onRequestClose={toggleNewActivityModal} style={{
    content: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      height: '63vh',
      border: '7px solid #ccc',
      padding: '20px',
      zIndex: '998',

      scrollbarWidth: 'none', // Para navegadores que no sean WebKit
      WebkitScrollbarWidth: 'none', // Para navegadores WebKit (Chrome, Safari, etc.)
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: '997',
    },
  }}>
      <div className="modalCreate-content">
      <h2 style={{ fontSize: '2em', color: '#00' }}>Nueva Actividad</h2>
        <form>
          <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
          <input type="text" id="nombre" name="nombre" required style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', margin: '0 0 10px 0', border: '1px solid #000' }} />
          <label htmlFor="encargados">Encargado:</label>
          <select name="encargados" id="encargados" style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', margin: '0 0 10px 0', border: '1px solid #000' }}></select>
          <label htmlFor="descripcion">Descripcion:</label>
          <input type="text" id="descripcion" name="descripcion" style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box', margin: '0 0 10px 0', border: '1px solid #000' }} />
          <div className="date" style={{ display: 'flex', gap: '10px', margin: '0 0 10px 0' }}>
            <div className="date-label" style={{ width: 'auto', marginBottom: '0' }}>
              <label htmlFor="fecha-inicio">Fecha de Inicio:</label>
              <input type="date" id="fecha-inicio" name="fecha-inicio" style={{ width: '100%', border: '1px solid #000' }} />
            </div>
            <div className="date-label" style={{ width: 'auto', marginBottom: '0' }}>
              <label htmlFor="fecha-fin">Fecha de Finalización:</label>
              <input type="date" id="fecha-fin" name="fecha-fin" style={{ width: '100%', border: '1px solid #000' }} />
            </div>
          </div>
          <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button type="button" className="guardar" style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#4CAF50', color: '#fff', margin: '0 10px 0 0' }}>Guardar</button>
            <button type="button" className="salir" onClick={toggleNewActivityModal} style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#FF0000', color: '#fff', margin: '0' }}>Cancelar</button>
          </div>
        </form>
      </div>
    </Modal>
    </>
  );
}
