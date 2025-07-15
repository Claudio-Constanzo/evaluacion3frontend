import { db } from './Firebase';
import { Persona } from './interfaces/Persona';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const colleccion = collection(db, 'personas');

export const obtenerPersonas = async (): Promise<{ data: Persona[]; error: string | null}> =>{
    try {
        const snapshot = await getDocs(colleccion);
        const personas = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Persona[];

        return {data: personas, error: null};
    } catch (error: any) {
        return {data: [], error: 'Error al obtener las personas: ' + error.message};
    }
        
};

export const agregarPersona = async (persona: Persona): Promise<{ data?: Persona; error?: string}> => {
    try {
        const docRef =await addDoc(colleccion, persona);
        return {data: {...persona, id: docRef.id} };
    } catch (error: any) {
        return {error: 'Error al agregar la persona: ' + error.message};
    }
};

export const actualizarPersona = async (persona: Persona): Promise <{ success: boolean; error?: string }> => {
    if (!persona.id) return { success: false, error: 'Falta id de la persona' };
    try {
        const { id,...datosPersona } = persona;
        const ref = doc(db, 'personas', id);
        await updateDoc(ref, datosPersona);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: 'Error al actualizar la persona: ' + error.message };
    }
};

export const eliminarPersona = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
        await deleteDoc(doc(db, 'personas', id));
        return { success: true };
    } catch (error: any) {
        return { success: false, error: 'Error al eliminar la persona: ' + error.message };
    }
};