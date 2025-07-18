'use client';
import { useState, useEffect } from 'react';
import { Persona } from '../../interfaces/Persona';
import { agregarPersona } from '../../Promesas';



interface Props {
  actualizarNombreActual(nombre: string): void;
}

const FormularioPersona = ({ actualizarNombreActual }: Props) => {
  const [persona, setPersona] = useState<Persona>({
    nombre: '', edad: 0, cargo: '', descripcion: '', tarea: '', fechaIngreso: ''
  });
    
  // useEffect(() =>{
  //   if (personaSeleccionada) {
  //     setPersona(personaSeleccionada);
  //   }
  // }, [personaSeleccionada]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersona({ ...persona, [name]: value });
    if (name === 'nombre') actualizarNombreActual(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await agregarPersona(persona);
    setPersona({ nombre: '', edad: 0, cargo: '', descripcion: '', tarea: '', fechaIngreso: '' });
    actualizarNombreActual('');
  };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();


  //   if (!validarFormulario()) return;

  //   if (personaSeleccionada) {
  //     guardarCambios(persona);
  //   } else {
  //     agregarPersona(persona);
  //   }

   
//   return (
// //     <form onSubmit={handleSubmit}>
// //       <h2>{personaSeleccionada ? 'Editar Persona' : 'Agregar Persona'}</h2>

// //       <input
// //         type="text"
// //         name="nombre"
// //         placeholder="Nombre"
// //         value={persona.nombre}
// //         onChange={handleChange}
// //       />
// //       <br/>
// //       {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}

// //       <input
// //         type="number"
// //         name="edad"
// //         placeholder="Edad"
// //         value={persona.edad}
// //         onChange={handleChange}
// //       />
// //       <br/>
// //       {errores.edad && <p style={{ color: 'red' }}>{errores.edad}</p>}

// //       <select name="cargo" value={persona.cargo} onChange={handleChange}>
// //         <option value="">Selecciona un cargo</option>
// //         <option value="Administrador">Administrador</option>
// //         <option value="Supervisor">Supervisor</option>
// //         <option value="Programador">Programador</option>
// //         <option value="Otro">Otro</option>
// //       </select>
// //       <br/>
// //       {errores.cargo && <p style={{ color: 'red' }}>{errores.cargo}</p>}


// //       <textarea
// //         name="descripcion"
// //         placeholder="Descripción"
// //         value={persona.descripcion}
// //         onChange={handleChange}
// //       />
// //       <br/>
// //       {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}

// //       <input
// //         type="text"
// //         name="tarea"
// //         placeholder="Tarea asignada"
// //         value={persona.tarea}
// //         onChange={handleChange}
// //       />
// //       <br/>
// //       {errores.tarea && <p style={{ color: 'red' }}>{errores.tarea}</p>}

// //       <input
// //         type="date"
// //         name="fechaIngreso"
// //         value={persona.fechaIngreso}
// //         onChange={handleChange}
// //       />
// //       <br/>
// //       {errores.fechaIngreso && <p style={{ color: 'red' }}>{errores.fechaIngreso}</p>}


// //       <button type="submit">
// //         {personaSeleccionada ? 'Actualizar' : 'Agregar'}
// //       </button>
// //       <br/>
// //     </form>
// //   );
// // };

return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Persona</h2>
      <input name="nombre" placeholder="Nombre" value={persona.nombre} onChange={handleChange} /><br/>
      <input name="edad" type="number" placeholder="Edad" value={persona.edad} onChange={handleChange} /><br/>
      <select name="cargo" value={persona.cargo} onChange={handleChange}><br/>
        <option value="">Cargo</option><br/>
        <option value="Administrador">Administrador</option><br/>
        <option value="Programador">Programador</option><br/>
        <option value="Supervisor">Supervisor</option><br/>
        <option value="Otro">Otro</option><br/>
      </select><br/>
      <textarea name="descripcion" placeholder="Descripción" value={persona.descripcion} onChange={handleChange} /><br/>
      <input name="tarea" placeholder="Tarea" value={persona.tarea} onChange={handleChange} /><br/>
      <input name="fechaIngreso" type="date" value={persona.fechaIngreso} onChange={handleChange} /><br/>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default FormularioPersona;