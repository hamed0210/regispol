import { create } from 'zustand'
import { insertarColaboracion, mostrarColaboraciones, mostrarColaboracion } from '../supabase/crudColaboraciones'

export const useColaboracionesStore = create((set, get) => ({
    colaboraciones: [],
    error: null,
    status: null,
    message: null,
    loading: false,

    insertCollab: async (props, { notificacionSuccess, notificacionError }) => {
        const res = await insertarColaboracion(props)
        if (res.error) return notificacionError('Error al ingresar registro')
        notificacionSuccess('Registro creado con exito')
    },

    getCollabs: async () => {
        set({ loading: true })
        const response = await mostrarColaboraciones()
        set({ colaboraciones: response, loading: false });
    },

})) 