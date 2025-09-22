import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Asterisk } from 'lucide-react'
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Styles from './nuevos.module.css'
import { useColaboracionesStore } from '../../store/colaboracionesStore'
import { usePersonasStore } from '../../store/personasStore'

z.config(z.locales.es());

const zodSchema = z.object({
  tipo_id: z.string().min(1, { message: "Este campo es requrido" }),
  id: z.string().min(1, { message: "Este campo es requrido" }).min(6, { message: "Debe tener minimo de 6 caracteres" }).max(10, { message: "Debe tener maximo de 10 caracteres" }),
  nombres: z.string().min(1, { message: "Este campo es requrido" }).min(3, { message: "Debe tener minimo de 3 caracteres" }),
  apellidos: z.string().min(1, { message: "Este campo es requrido" }).min(3, { message: "Debe tener minimo de 3 caracteres" }),
  direccion: z.string().min(1, { message: "Este campo es requrido" }).min(3, { message: "Debe tener minimo de 3 caracteres" }),
  celular: z.string().min(1, { message: "Este campo es requrido" }).min(6, { message: "Debe tener 10 caracteres" }).max(10, { message: "Debe tener maximo de 10 caracteres" }),
  email: z.email().toLowerCase().trim().nullable(),
  colaboracion: z.string().nullable(),
  fecha_colaboracion: z.string().nullable(),
  entregado_por: z.string().min(1, { message: "Este campo es requrido" }).min(3, { message: "Debe tener minimo de 3 caracteres" }),
  // password: z
  //   .string().regex(/^[a-z]+$/).trim()
});

const index = () => {
  const { insertCollab } = useColaboracionesStore()
  const { getPersons, personas } = usePersonasStore()
  const [isDisableInput, setIsDisableInput] = useState(false)

  useEffect(() => {
    getPersons()
  }, [getPersons])

  const notificacionSuccess = (message) =>
    toast.success(message, {
      // className={Styles.notificacion},
      theme: "light",
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
      closeButton: false,
      //   hideProgressBar: false,
      autoClose: 3000,
    });

  const notificacionError = (message) =>
    toast.error(message, {
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
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      id: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      celular: '',
      email: null,
      colaboracion: null,
      fecha_colaboracion: null,
      entregado_por: '',
    }, resolver: zodResolver(zodSchema),
  })

  const inputId = watch('id', '')

  useEffect(() => {
    if (!inputId) return;

    const match = personas.find(item => item.id.toString().toLowerCase() === inputId);

    setIsDisableInput(true)

    if (match) {
      reset({
        tipo_id: match.type_id,
        nombres: match.names,
        apellidos: match.surnames,
        direccion: match.address,
        celular: match.cel.toString(),
        email: match.email,
        fecha_colaboracion: null,
      });
    } else {
      setIsDisableInput(false)
    }
  }, [inputId, personas, reset])


  const onSubmit = handleSubmit(async (datos) => {
    try {
      const res = await insertCollab(datos, { notificacionSuccess, notificacionError })
    } catch (error) {
      console.log(error)
    } finally {
      reset({
        tipo_id: 'CC',
        id: '',
        nombres: '',
        apellidos: '',
        direccion: '',
        celular: '',
        email: null,
        colaboracion: null,
        fecha_colaboracion: null,
        entregado_por: '',
      });
      setIsDisableInput(false)
    }
  })

  return (
    <>
      <ToastContainer
        className={Styles.notificacion_contenedor}
        toastClassName={Styles.notificacion}
        progressClassName={Styles.notificacion_progress}
      />
      <div className={Styles.container}>
        <h2 className={Styles.titulo}>Nuevo</h2>
        <form className={Styles.form} onSubmit={onSubmit}>
          <div className={Styles.personal_data}>
            <div className={Styles.inputGroup}>
              <select className={Styles.input_select} name='tipo_id' id='tipo_id' disabled={isDisableInput} {...register('tipo_id')}>
                <option value='CC'>Cedula de ciudadania</option>
                <option value='TI'>Tarjeta de identidad</option>
                <option value='PPT'>Permiso de proteccion temporal</option>
              </select>
              <span className={Styles.label}>
                Seleccione su tipo de identificacion
              </span>
              <Asterisk size={14} className={Styles.icon_requerido} />
            </div>
            <div className={Styles.inputGroup}>
              <input className={Styles.input} type='number' {...register('id')} />
              <span className={Styles.label}>Identificacion</span>
              <Asterisk size={14} className={Styles.icon_requerido} />
              {errors.id && (
                <span className={Styles.error_label}>{errors.id.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                type='text'
                disabled={isDisableInput}
                {...register('nombres')}
              // value={filteredPersonas ? filteredPersonas.names : ''}
              />
              <span className={Styles.label}>Nombres</span>
              <Asterisk size={14} className={Styles.icon_requerido} />
              {errors.nombres && (
                <span className={Styles.error_label}>{errors.nombres.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                disabled={isDisableInput}
                type='text'
                {...register('apellidos')}
              // value={filteredPersonas ? filteredPersonas.surnames : ''}
              />
              <span className={Styles.label}>Apellidos</span>
              <Asterisk size={14} className={Styles.icon_requerido} />
              {errors.apellidos && (
                <span className={Styles.error_label}>{errors.apellidos.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                disabled={isDisableInput}
                type='text'
                {...register('direccion')}
              // value={filteredPersonas ? filteredPersonas.address : ''}
              />
              <span className={Styles.label}>Direccion</span>
              <Asterisk size={14} className={Styles.icon_requerido} />
              {errors.direccion && (
                <span className={Styles.error_label}>{errors.direccion.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                disabled={isDisableInput}
                type='number'
                min={1}
                {...register('celular')}
              // value={filteredPersonas ? filteredPersonas.cel : ''}
              />
              <span className={Styles.label}>Celular</span>
              <Asterisk size={14} className={Styles.icon_requerido} />
              {errors.celular && (
                <span className={Styles.error_label}>{errors.celular.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                disabled={isDisableInput}
                type='text'
                {...register('email')}
              // value={filteredPersonas ? filteredPersonas.email : ''}
              />
              <span className={Styles.label}>Email</span>
              {errors.email && (
                <span className={Styles.error_label}>{errors.email.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <textarea
                className={`${Styles.input} ${Styles.textarea}`}
                type='text'
                {...register('colaboracion')}
              />
              <span className={`${Styles.label} ${Styles.label_textarea}`}>Colaboracion</span>
              {errors.colaboracion && (
                <span className={Styles.error_label}>{errors.colaboracion.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                type='date'
                {...register('fecha_colaboracion')}
              />
              <span className={Styles.label}>Fecha Colaboracion</span>
              {errors.fecha_colaboracion && (
                <span className={Styles.error_label}>{errors.fecha_colaboracion.message}</span>
              )}
            </div>
            <div className={Styles.inputGroup}>
              <input
                className={Styles.input}
                type='text'
                {...register('entregado_por')}
              />
              <span className={Styles.label}>Entregado Por</span>
              <Asterisk size={14} className={Styles.icon_requerido} />
              {errors.entregado_por && (
                <span className={Styles.error_label}>{errors.entregado_por.message}</span>
              )}
            </div>
            <button
              className={Styles.button}
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <><span className={Styles.loader} /> Entrando</> : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default index
