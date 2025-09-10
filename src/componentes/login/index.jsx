import { useState } from "react";
import { useForm } from "react-hook-form";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import Styles from "./login.module.css";

const zodSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Este campo es requrido" })
        .min(6, { message: "Debe tener mas de 6 caracteres" })
        .max(10, { message: "Debe tener maximo 10 caracteres" }),
    // .regex(/^d+$/, { message: "Solo se aceptan numeros enteros" }),
    password: z
        .string()
        .min(1, { message: "Este campo es requrido" })
        .min(6, { message: "Debe tener mas de 6 caracteres" }),
});

// const zodSchemaRequerido = zodSchema.required();

const index = () => {
    const [verContraseña, setVerContraseña] = useState(false);

    const notificacion = () =>
        toast.error("Los datos ingresados son incorrectos", {
            // className={Styles.notificacion},
            theme: "light",
            pauseOnHover: false,
            closeOnClick: true,
            closeButton: false,
            //   hideProgressBar: false,
            autoClose: 3000,
        });

    const data = {
        usuario: "1046814387",
        contraseña: "1234",
    };

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(zodSchema),
    });

    const handleContraseña = (icon) => {
        const inputContraseña = icon.target.parentNode.firstChild;

        if (verContraseña) {
            setVerContraseña(false);
            inputContraseña.type = "password";
        } else {
            setVerContraseña(true);
            inputContraseña.type = "text";
        }
    };

    const onSubmit = handleSubmit(async (datos) => {
        // datos.id === data.usuario ? console.log("igaul") : console.log("no igaul");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // const result = zodSchema.safeParse(datos);
            // if (result.success) {
            // } else { }
            console.log(datos);
        } catch (error) {
            notificacion();
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
                            placeholder="Escriba su correo"
                            disabled={isSubmitting}
                            {...register("email", { required: true })}
                        />
                        <div className={Styles.labelGroup}>
                            <AtSign size={16} />
                            <span className={Styles.label}>Correo</span>
                        </div>
                        {errors.id && (
                            <span className={Styles.requerido}>{errors.id.message}</span>
                        )}
                    </div>
                    <div className={Styles.inputGroup}>
                        <input
                            className={Styles.input}
                            placeholder="Escriba su contraseña"
                            type="password"
                            disabled={isSubmitting}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Este campo es requerido",
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
                        {isSubmitting ? <span className={Styles.loader}></span> : "Entrar"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default index;
