import { supabase } from './supabase.config'

export const insertarPersona = async (props) => {
    try {
        const res = await supabase.from('persons').insert(
            {
                type_id: props.tipo_id,
                id: props.id,
                names: props.nombres,
                surnames: props.apellidos,
                address: props.direccion,
                cel: props.celular,
                email: props.email,
            }
        ).select()
        return res
    } catch (error) {
        console.log(error)
    }
}

export const mostrarPersonas = async () => {
    try {
        const { error, data } = await supabase.from('persons').select()
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};

export const mostrarPersona = async (cod) => {
    try {
        const { error, data } = await supabase.from("persons").select().eq("cod", cod).single();
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};

export const actualizarPersona = async (props) => {
    try {
        const { error, data } = await supabase.from("persons").update({
            type_id,
            id,
            names,
            surnames,
            address,
            cel,
            email,
        }).eq("cod", props.cod).select();
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};

export const eliminarColaboracion = async (cod) => {
    try {
        const { error, data } = await supabase.from("persons").delete().eq("cod", cod);
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};