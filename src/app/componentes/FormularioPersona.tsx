'use client';
import { useState } from 'react';
import { Persona } from '../../interfaces/Persona';
import { agregarPersona } from '../../Promesas';

interface Props {
  actualizarNombreActual(nombre: string): void;
}

interface Errores {
  nombre?: string;
  edad?: string;
  cargo?: string;
  descripcion?: string;
  tarea?: string;
  fechaIngreso?: string;
}

const FormularioPersona = ({ actualizarNombreActual }: Props) => {
  const [persona, setPersona] = useState<Persona>({
    nombre: '', edad: 0, cargo: '', descripcion: '', tarea: '', fechaIngreso: ''
  });
  const [errores, setErrores] = useState<Errores>({});

  const validarFormulario = () => {
    const nuevosErrores: Errores = {};
    
    if (!persona.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(persona.nombre)) {
      nuevosErrores.nombre = 'El nombre solo puede contener letras';
    }
    // Edad: mínimo 18 y maximo 99
    if (!persona.edad || persona.edad < 18) {
      nuevosErrores.edad = 'La edad debe ser al menos 18';
    } else if (persona.edad > 99) {
      nuevosErrores.edad = 'La edad no puede ser mayor a 99';
    }
    
    if (!persona.cargo) {
      nuevosErrores.cargo = 'El cargo es obligatorio';
    }
    
    if (!persona.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    }
    
    if (!persona.tarea.trim()) {
      nuevosErrores.tarea = 'La tarea es obligatoria';
    }
    // FechaIngreso: no vacío y entre 01-01-2025 y 31-12-2025
    if (!persona.fechaIngreso) {
      nuevosErrores.fechaIngreso = 'Ingrese una fecha válida (01-01-2025 a 31-12-2025)';
    } else {
      const fecha = new Date(persona.fechaIngreso);
      const minFecha = new Date('2025-01-01');
      const maxFecha = new Date('2025-12-31');
      if (fecha < minFecha || fecha > maxFecha) {
        nuevosErrores.fechaIngreso = 'La fecha debe estar entre 01-01-2025 y 31-12-2025';
      }
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: name === 'edad' ? Number(value) : value });
    if (name === 'nombre') actualizarNombreActual(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    await agregarPersona(persona);
    setPersona({ nombre: '', edad: 0, cargo: '', descripcion: '', tarea: '', fechaIngreso: '' });
    setErrores({});
    actualizarNombreActual('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Persona</h2>
      <input name="nombre" placeholder="Nombre" value={persona.nombre} onChange={handleChange} /><br />
      {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}

      <input name="edad" type="number" placeholder="Edad" value={persona.edad} onChange={handleChange} /><br />
      {errores.edad && <p style={{ color: 'red' }}>{errores.edad}</p>}

      <select name="cargo" value={persona.cargo} onChange={handleChange}>
        <option value="">Cargo</option>
        <option value="Administrador">Administrador</option>
        <option value="Programador">Programador</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Otro">Otro</option>
      </select><br />
      {errores.cargo && <p style={{ color: 'red' }}>{errores.cargo}</p>}

      <textarea name="descripcion" placeholder="Descripción" value={persona.descripcion} onChange={handleChange} /><br />
      {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}

      <input name="tarea" placeholder="Tarea" value={persona.tarea} onChange={handleChange} /><br />
      {errores.tarea && <p style={{ color: 'red' }}>{errores.tarea}</p>}

      <input name="fechaIngreso" type="date" value={persona.fechaIngreso} onChange={handleChange} /><br />
      {errores.fechaIngreso && <p style={{ color: 'red' }}>{errores.fechaIngreso}</p>}

      <button type="submit">Agregar</button>
    </form>
  );
};

export default FormularioPersona;
