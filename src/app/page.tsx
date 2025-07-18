'use client';
import {  useState } from 'react';
import { Persona } from '../interfaces/Persona';
import FormularioPersona from './componentes/FormularioPersona';
import {usePersonasTiempoReal} from '../Promesas';

export default function Page() {
  const [nombreActual, setNombreActual] = useState('');
  const personas = usePersonasTiempoReal();


  return (
    <div className="App">
      <h1>Gestión de Personas y Tareas</h1>
      <h2>Bienvenido {nombreActual}</h2>

      <FormularioPersona actualizarNombreActual={setNombreActual} />
      
      
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
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}