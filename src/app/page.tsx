'use client';
import { useState } from 'react';
import { Persona } from '../interfaces/Persona';
import FormularioPersona from './componentes/FormularioPersona';
import { usePersonasTiempoReal, eliminarPersona as eliminarPersonaApi } from '../Promesas';

export default function Page() {
  const [nombreActual, setNombreActual] = useState('');
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
  const personas = usePersonasTiempoReal();

  const seleccionarPersona = (persona: Persona) => {
    setPersonaSeleccionada(persona);
    setNombreActual(persona.nombre);
  };

  const limpiarSeleccion = () => {
    setPersonaSeleccionada(null);
  };

  const eliminarPersona = async (id: string) => {
    const respuesta = await eliminarPersonaApi(id);
    if (respuesta && respuesta.success) {
      alert('Persona eliminada correctamente');
      limpiarSeleccion();
    } else {
      alert((respuesta && respuesta.error) || 'Error al eliminar la persona');
    }
  };
  

  return (
    <div className="App">
      <h1>Gestión de Personas y Tareas</h1>
      <h2>Bienvenido {nombreActual}</h2>

      <FormularioPersona
        personaSeleccionada={personaSeleccionada}
        actualizarNombreActual={setNombreActual}
        guardarCambiosLocal={limpiarSeleccion}
      />

      <h3>Lista de personas registradas</h3>
      {personas.length === 0 ? (
        <p>No hay personas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Cargo</th>
              <th>Tarea</th>
              <th>Fecha de ingreso</th>
              <th>Descripción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {personas
              .slice()
              .sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.edad}</td>
                  <td>{p.cargo}</td>
                  <td>{p.tarea}</td>
                  <td>{p.fechaIngreso}</td>
                  <td>{p.descripcion}</td>
                  <td>
                    <button type="button" onClick={() => seleccionarPersona(p)}>Editar</button>
                    <button type="button" onClick={() => p.id && eliminarPersona(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
