import { create } from 'zustand'
import { insertarColaboracion, mostrarColaboraciones, eliminarColaboracion } from '../supabase/crudColaboraciones'
import { usePersonasStore } from './personasStore'

export const useColaboracionesStore = create((set, get) => ({
    colaboraciones: [],
    loading: false,

    insertCollab: async (props, { notificacionSuccess, notificacionError }) => {
        const res = await insertarColaboracion(props)
        if (res.error) return notificacionError('Error al ingresar registro')
        const personasUpdate = usePersonasStore.getState()
        personasUpdate.getPersons()
        notificacionSuccess('Registro creado con exito')
    },

    getCollabs: async () => {
        set({ loading: true })
        const response = await mostrarColaboraciones()
        set({ colaboraciones: response, loading: false });
    },

    deleteCollab: async (props, { notificacionSuccess, notificacionError }) => {
        set({ loading: true })
        const res = await eliminarColaboracion(props)
        if (res.error) {
            notificacionError('Error al elimiar registro')
            set({ loading: false })
            return
        }
        set((state) => ({
            colaboraciones: state.colaboraciones.filter((colabs) => colabs.cod !== props),
        }));
        notificacionSuccess('Registro Eliminado correctamente')
        set({ loading: false });
    }

})) 