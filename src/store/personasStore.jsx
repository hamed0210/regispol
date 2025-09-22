import { create } from 'zustand'
import { mostrarPersonas } from '../supabase/crudPersonas'

export const usePersonasStore = create((set, get) => ({
    personas: [],
    loading: false,

    getPersons: async () => {
        set({ loading: true })
        const response = await mostrarPersonas()
        set({ personas: response, loading: false });
    },

})) 