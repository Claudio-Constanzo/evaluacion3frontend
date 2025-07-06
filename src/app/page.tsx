'use client';
import { useEffect, useState } from 'react';
import { Persona } from './interfaces/Persona';
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