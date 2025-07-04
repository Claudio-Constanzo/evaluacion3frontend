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

  const validarFormulario = () => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; 
    const fechaMin = '2025-01-01';
    const fechaMax = '2025-12-31';

    const erroresNombre =
      persona.nombre.trim() === ''
        ? 'El nombre es obligatorio.'
        : !soloLetras.test(persona.nombre.trim())
        ? 'El nombre solo debe contener letras.'
        : '';

    const erroresEdad =
      persona.edad <= 18
        ? 'Edad invalida, la edad debe ser mayor que 18.'
        : persona.edad > 100
        ? 'Edad invalida, la edad no debe superar los 100 años.'
        : '';

    const erroresFecha =
      persona.fechaIngreso === ''
        ? 'Selecciona una fecha de ingreso.'
        : persona.fechaIngreso < fechaMin || persona.fechaIngreso > fechaMax
        ? 'La fecha debe estar entre 2025-01-01 y 2025-12-31.'
        : '';

    const nuevosErrores = {
      nombre: erroresNombre,
      edad: erroresEdad,
      cargo: persona.cargo.trim() === '' ? 'Selecciona un cargo.' : '',
      descripcion: persona.descripcion.trim() === '' ? 'La descripción es obligatoria.' : '',
      tarea: persona.tarea.trim() === '' ? 'Debes asignar una tarea.' : '',
      fechaIngreso: erroresFecha,
    };

    setErrores(nuevosErrores);

    // Retorna true si no hay errores
    return Object.values(nuevosErrores).every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!validarFormulario()) return;

    if (personaSeleccionada) {
      guardarCambios(persona);
    } else {
      agregarPersona(persona);
    }

    setPersona({
      nombre: '',
      edad: 0,
      cargo: '',
      descripcion: '',
      tarea: '',
      fechaIngreso: '',
    });

    setErrores({
      nombre: '',
      edad: '',
      cargo: '',
      descripcion: '',
      tarea: '',
      fechaIngreso: '',
    }); 
    actualizarNombreActual('');

  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!validarFormulario()) return;

    if (personaSeleccionada) {
      guardarCambios(persona);
    } else {
      agregarPersona(persona);
    }

    setPersona({
      nombre: '',
      edad: 0,
      cargo: '',
      descripcion: '',
      tarea: '',
      fechaIngreso: '',
    });

    setErrores({
      nombre: '',
      edad: '',
      cargo: '',
      descripcion: '',
      tarea: '',
      fechaIngreso: '',
    }); 
    actualizarNombreActual('');

  };
}