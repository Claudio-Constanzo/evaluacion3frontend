'use client';
import { use, useEffect, useState } from "react";
import { Persona } from "../interfaces/Persona";

interface Props {
  agregarPersona(persona: Persona): any;
  guardarCambios(persona: Persona): any;
  personaSeleccionada: Persona | null;
  actualizarNombreActual(nombre: string): void;
}

const FormularioPersona = () => {
    const[persona, setPersona] = useState<Persona>({
        nombre: '',
        edad: 0,
        cargo: '',
        descripcion: '',
        tarea: '',
        fechaIngreso: ''
    });

    const [errores, setErrores] = useState({
        nombre: '',
        edad: '',
        cargo: '',
        descripcion: '',
        tarea: '',
        fechaIngreso: ''
        });
    
    useEffect(() =>{
        if (personaSeleccionada) {
            setPersona(personaSeleccionada);
        }
    }, [personaSeleccionada]);

    const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setPersona({ ...persona, [name]: value });


  if (name === 'nombre') {
    actualizarNombreActual(value);
  }

   setErrores({ ...errores, [name]: '' });
};
}