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
          personas.map((p) => (
            <div key={p.id}>
              <p>Nombre: </p><strong>{p.nombre}</strong> 
              <p>Edad: </p>({p.edad}) <br/>
              <p>Cargo: </p>{p.cargo} <br/>
              <p> Tarea:</p>{p.tarea} <br/>
              <p> Fecha de ingreso: </p>{p.fechaIngreso} <br/>
              <p> Descripcion: </p>{p.descripcion} <br/>
            </div>
          ))
      )}
    </div>
  );
}