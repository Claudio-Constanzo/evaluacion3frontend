import { db } from './Firebase';
import { Persona } from '../interfaces/Persona';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const colleccion = collection(db, 'personas');

export const obtenerPersonas = async (): Promise<{ data: Persona[]; error: string | null}> =>{
    try {
        const snapshot = await getDocs(colleccion);
        const personas = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Persona[];
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

