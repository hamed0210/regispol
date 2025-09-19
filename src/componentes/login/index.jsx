import { useState } from "react";
import { useForm } from "react-hook-form";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Styles from "./login.module.css";
import { supabase } from '../../supabase/supabase.config'

z.config(z.locales.es());

const zodSchema = z.object({
    email: z
        .email().toLowerCase().trim(),
    password: z
        .string().trim()
        .min(1, { message: "Este campo es requrido" })
        .min(6, { message: "Debe tener mas de 6 caracteres" }),
});

const index = () => {
    const [verContraseña, setVerContraseña] = useState(false);
    const [contraseñaType, setContraseñaType] = useState('password');

    const notificacion = () =>
        toast.error("Los datos ingresados son incorrectos", {
            // className={Styles.notificacion},
            theme: "light",
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            closeOnClick: true,
            closeButton: false,
            //   hideProgressBar: false,
            autoClose: 3000,
        });

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: 'hduran0210@gmail.com',
            password: '910210Vaquero'
        },
        resolver: zodResolver(zodSchema),
    });

    const handleContraseña = () => {
        if (verContraseña) {
            setVerContraseña(false);
            setContraseñaType('password')
        } else {
            setVerContraseña(true);
            setContraseñaType('text')
        }

    };

    const onSubmit = handleSubmit(async ({ email, password }) => {
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000));

            // datos.email === data.usuario ?
            //     datos.password === data.contraseña
            //         ? console.log("igaul") : notificacion()
            //     : notificacion();
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            error && notificacion()
        } catch (error) {
            // setError("root", {
            //   message: "This email is already taken",
            // });
        }
    });

    return (
        <>
            <ToastContainer
                className={Styles.notificacion_contenedor}
                toastClassName={Styles.notificacion}
                progressClassName={Styles.notificacion_progress}
            />
            <div className={Styles.content}>
                <div className={Styles.logo_contenedor}>
                    <span className={Styles.titulo_logo}>regispol</span>
                </div>
                <h1 className={Styles.tittle}>¡Bienvenido!</h1>
                <form className={Styles.form} onSubmit={onSubmit}>
                    <div className={Styles.inputGroup}>
                        <input
                            className={Styles.input}
                            type="email"
                            placeholder="Escriba su correo electrónico"
                            disabled={isSubmitting}
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <div className={Styles.labelGroup}>
                            <AtSign size={16} />
                            <span className={Styles.label}>Correo</span>
                        </div>
                        {errors.email && (
                            <span className={Styles.requerido}>{errors.email.message}</span>
                        )}
                    </div>
                    <div className={Styles.inputGroup}>
                        <input
                            className={Styles.input}
                            placeholder="Escriba su contraseña"
                            type={contraseñaType}
                            disabled={isSubmitting}
                            {...register("password", {
                                required: {
                                    value: true,
                                },
                            })}
                        />
                        {errors.password && (
                            <span className={Styles.requerido}>
                                {errors.password.message}
                            </span>
                        )}
                        <span
                            className={Styles.contraseña_eye_contenedor}
                            onClick={handleContraseña}
                        >
                            {verContraseña ? (
                                <Eye size={16} strokeWidth={3} className={Styles.contraseña_eye} />
                            ) : (
                                <EyeOff size={16} strokeWidth={3} className={Styles.contraseña_eye} />
                            )}
                        </span>
                        <div className={Styles.labelGroup}>
                            <Lock size={14} />
                            <span className={Styles.label}>Contraseña</span>
                        </div>
                    </div>
                    {/* <span className={Styles.recuperar}>¿Olvidó su contraseña?</span> */}
                    <button
                        className={Styles.button}
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting ? <><span className={Styles.loader} /> Entrando</> : "Entrar"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default index;
