'use client';
import {  useState } from 'react';
import FormularioPersona from './componentes/FormularioPersona';
import {usePersonasTiempoReal,agregarPersona, actualizarPersona, eliminarPersona} from '../Promesas';
import { Persona } from '../interfaces/Persona';

export default function Page() {
  const [nombreActual, setNombreActual] = useState('');
  const personas = usePersonasTiempoReal();
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
  const seleccionarPersonaParaEditar = (persona: Persona) => {
    setPersonaSeleccionada(persona);
    setNombreActual(persona.nombre);
  };
  const guardarCambios = async (personaActualizada: Persona) => {
    const resultado = await actualizarPersona(personaActualizada);
    if (resultado.success) {
      setNombreActual(personaActualizada.nombre);
      setPersonaSeleccionada(null);
      window.alert('Persona actualizada correctamente.');
    } else {
      window.alert('Error al actualizar la persona: ' + resultado.error);
    }
  };
  return (
    <div className="App">
      <h1>Gestión de Personas y Tareas</h1>
      <h2>{personaSeleccionada ? 'Editar Persona' : 'Agregar Persona'}</h2>

      <FormularioPersona 
      actualizarNombreActual={setNombreActual} 
      guardarCambios={guardarCambios}
      personaSeleccionada={personaSeleccionada}
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
                    <button type= "submit" onClick={() => {personaSeleccionada ? 'Actualizar' : 'Agregar'}}>Editar</button>
                    <button onClick={() => p.id && eliminarPersona(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}