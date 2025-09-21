import { supabase } from './supabase.config'

export const insertarColaboracion = async (props) => {
    try {
        const res = await supabase
            .rpc('insert_or_create_person_and_new_collab', {
                p_type_id: props.tipo_id,
                p_id: props.id,
                p_names: props.nombres,
                p_surnames: props.apellidos,
                p_address: props.direccion,
                p_cel: props.celular,
                p_email: props.email,
                c_collab: props.colaboracion,
                c_date_collab: props.fecha_colaboracion,
                c_delivered_by: props.entregado_por,
            })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const mostrarColaboraciones = async () => {
    try {
        const { error, data } = await supabase.from('collabs').select('*, persons(*)')
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};

export const mostrarColaboracion = async (colab) => {
    try {
        const { error, data } = await supabase.from("collabs").select().eq("cod", colab).single();
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};

export const actualizarColaboracion = async (colab) => {
    try {
        const { error, data } = await supabase.from("collabs").update({
            type_id,
            id,
            names,
            surnames,
            address,
            cel,
            email,
            collab,
            date_collab,
            delivered_by,
            created_by,

        }).eq("cod", colab.cod).select();
        if (error) return null
        if (data) return data;
    } catch (error) {
        console.log(error)
    }
};

export const eliminarColaboracion = async (colab) => {
    try {
        const res = await supabase.from("collabs").delete().eq("cod", colab);
        return res
    } catch (error) {
        console.log(error)
    }
};