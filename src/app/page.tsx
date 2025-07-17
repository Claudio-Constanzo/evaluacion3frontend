'use client';
import { useEffect, useState } from 'react';
import { Persona } from '../interfaces/Persona';
import FormularioPersona from './componentes/FormularioPersona';
import usePersonasTiempoReal from '../Promesas';

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
     
        
          {personas.map((p) => (
            <div key={p.id}>
              <strong>{p.nombre}</strong> ({p.edad}) <br/>
              {p.cargo} - {p.tarea} <br/>
              {p.fechaIngreso} <br/>
              {p.descripcion} <br/>
            </div>
          ))}
          </div>
  );
}