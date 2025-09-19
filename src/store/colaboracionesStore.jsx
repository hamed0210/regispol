import { create } from 'zustand'
import { insertarColaboracion, mostrarColaboraciones, mostrarColaboracion } from '../supabase/crudColaboraciones'

export const useColaboracionesStore = create((set, get) => ({
    colaboraciones: [],
    error: null,
    status: null,
    message: '',

    insertCollab: async (props) => {
        const res = await insertarColaboracion(props)
        if (res.error) return console.log(res.error)
        // return (
        //     res.error.code === '23505' && set({ error: 'Persona ya se encuentra ingresada' })
        // )
        console.log(res.data)
        set({ message: 'Registro creado con exito' });
    },

    getCollabs: async () => {
        const response = await mostrarColaboraciones()
        set({ colaboraciones: response });
    },

})) 