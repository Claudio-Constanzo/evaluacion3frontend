'use client';
import { useEffect, useState } from 'react';
import { Persona } from '../interfaces/Persona';
import FormularioPersona from './componentes/FormularioPersona';

export default function Page() {
  const [nombreActual, setNombreActual] = useState('');
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('personas');
    if (datosGuardados) {
      setPersonas(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('personas', JSON.stringify(personas));
  }, [personas]);

  const agregarPersona = (persona: Persona) => {
    setPersonas([...personas, persona]);
  };

  const eliminarPersona = (indice: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta persona?')) {
      const nuevasPersonas = personas.filter((_, i) => i !== indice);
      setPersonas(nuevasPersonas);
    }
  };

  const editarPersona = (indice: number) => {
    setPersonaSeleccionada(personas[indice]);
    setIndiceEditar(indice);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actualizarPersona = (personaActualizada: Persona) => {
    if (indiceEditar !== null) {
      const nuevasPersonas = [...personas];
      nuevasPersonas[indiceEditar] = personaActualizada;
      setPersonas(nuevasPersonas);
      setPersonaSeleccionada(null);
      setIndiceEditar(null);
    }
  };

  return (
    <div className="App">
      <h1>Gestión de Personas y Tareas</h1>
      <h2>Bienvenido {nombreActual}</h2>
      <FormularioPersona
        agregarPersona={agregarPersona}
        personaSeleccionada={personaSeleccionada}
        guardarCambios={actualizarPersona}
        actualizarNombreActual={setNombreActual}
      />

      <h3>Lista de personas registradas</h3>
      <table border={1} style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Cargo</th>
            <th>Descripción</th>
            <th>Tarea</th>
            <th>Fecha de Ingreso</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{p.nombre}</td>
              <td>{p.edad}</td>
              <td>{p.cargo}</td>
              <td>{p.descripcion}</td>
              <td>{p.tarea}</td>
              <td>{p.fechaIngreso}</td>
              <td>
                <button onClick={() => editarPersona(index)}>Editar</button>{' '}
                <button onClick={() => eliminarPersona(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}