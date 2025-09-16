import { useForm } from 'react-hook-form'
import { Asterisk } from 'lucide-react'

import Styles from './nuevos.module.css'

const index = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: {
    //     errors
    // }
  } = useForm()

  const onSubmit = handleSubmit(() => { })

  return (
    <div className={Styles.container}>
      <h2 className={Styles.titulo}>Nuevo</h2>
      <form className={Styles.form} onSubmit={onSubmit}>
        <div className={Styles.personal_data}>
          <div className={Styles.inputGroup}>
            <select className={Styles.input_select} name='tipo_id' id='tipo_id'>
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
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='text'
              {...register('nombres')}
            />
            <span className={Styles.label}>Nombres</span>
            <Asterisk size={14} className={Styles.icon_requerido} />
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='text'
              {...register('apellidos')}
            />
            <span className={Styles.label}>Apellidos</span>
            <Asterisk size={14} className={Styles.icon_requerido} />
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='text'
              {...register('direccion')}
            />
            <span className={Styles.label}>Direccion</span>
            <Asterisk size={14} className={Styles.icon_requerido} />
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='number'
              {...register('celular')}
            />
            <span className={Styles.label}>Celular</span>
            <Asterisk size={14} className={Styles.icon_requerido} />
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='text'
              {...register('email')}
            />
            <span className={Styles.label}>Email</span>
          </div>
          <div className={Styles.inputGroup}>
            <textarea
              className={`${Styles.input} ${Styles.textarea}`}
              type='text'
              {...register('colaboracion')}
            />
            <span className={`${Styles.label} ${Styles.label_textarea}`}>Colaboracion</span>
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='date'
              {...register('fecha_colaboracion')}
            />
            <span className={Styles.label}>Fecha Colaboracion</span>
          </div>
          <div className={Styles.inputGroup}>
            <input
              className={Styles.input}
              type='text'
              {...register('entregado_por')}
            />
            <span className={Styles.label}>Entregado Por</span>
            <Asterisk size={14} className={Styles.icon_requerido} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default index
