'use client';
import { useEffect, useState } from "react";
import { Persona } from "../interfaces/Persona";

interface Props {
  agregarPersona(persona: Persona): any;
  guardarCambios(persona: Persona): any;
  personaSeleccionada: Persona | null;
  actualizarNombreActual(nombre: string): void;
}

const FormularioPersona = ({ agregarPersona, guardarCambios, personaSeleccionada, actualizarNombreActual }: Props) => {
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
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>{personaSeleccionada ? 'Editar Persona' : 'Agregar Persona'}</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={persona.nombre}
        onChange={handleChange}
      />
      <br/>
      {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}

      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={persona.edad}
        onChange={handleChange}
      />
      <br/>
      {errores.edad && <p style={{ color: 'red' }}>{errores.edad}</p>}

      <select name="cargo" value={persona.cargo} onChange={handleChange}>
        <option value="">Selecciona un cargo</option>
        <option value="Administrador">Administrador</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Programador">Programador</option>
        <option value="Otro">Otro</option>
      </select>
      <br/>
      {errores.cargo && <p style={{ color: 'red' }}>{errores.cargo}</p>}


      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={persona.descripcion}
        onChange={handleChange}
      />
      <br/>
      {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}

      <input
        type="text"
        name="tarea"
        placeholder="Tarea asignada"
        value={persona.tarea}
        onChange={handleChange}
      />
      <br/>
      {errores.tarea && <p style={{ color: 'red' }}>{errores.tarea}</p>}

      <input
        type="date"
        name="fechaIngreso"
        value={persona.fechaIngreso}
        onChange={handleChange}
      />
      <br/>
      {errores.fechaIngreso && <p style={{ color: 'red' }}>{errores.fechaIngreso}</p>}


      <button type="submit">
        {personaSeleccionada ? 'Actualizar' : 'Agregar'}
      </button>
      <br/>
    </form>
  );
};

export default FormularioPersona;