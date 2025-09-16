import { useState } from 'react'
import { Trash } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'

import Styles from './consultas.module.css'
// import Modal from '../../../hooks/modalHook'

const index = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const notificacion = () =>
    toast.success('Cita eliminada con exito', {
      theme: 'light',
      pauseOnHover: false,
      closeOnClick: true,
      closeButton: false,
      pauseOnFocusLoss: false,
      autoClose: 3000,
    })

  const handleCancelarCita = async () => {
    setModalOpen(false)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      notificacion()
    } catch (error) {
      notificacion()
    }
  }

  const handleAbrirModal = () => {
    setModalOpen(true)
  }

  return (
    <>
      <ToastContainer
        className={Styles.notificacion_contenedor}
        toastClassName={Styles.notificacion}
        progressClassName={Styles.notificacion_progress}
      />
      <div className={Styles.container}>
        <h2 className={Styles.titulo}>Consultas</h2>
        <div className={Styles.busqueda_contenedor}>
          <div className={Styles.fechas_busqueda_contenedor}>
            <span className={Styles.fecha_busqueda_titulo}>
              Buscar por rango
            </span>
            <div className={Styles.fecha_busqueda_inputs}>
              <input className={Styles.input} type='date' />
              <input className={Styles.input} type='date' />
            </div>
          </div>
          <div>
            <input
              className={Styles.input}
              type='text'
              placeholder='Buscar'
            />
          </div>
        </div>
        <div className={Styles.lista_container}>
          <div className={Styles.lista_item}>
            <div className={`${Styles.lista_item_fecha} ${Styles.activo}`}>
              <span className={Styles.lista_item_fecha_dia}>16</span>
              <div className={Styles.lista_item_fecha_mes_año_contenedor}>
                <span className={Styles.lista_item_fecha_mes}>Feb</span>
                <span className={Styles.lista_item_fecha_año}>2024</span>
              </div>
            </div>
            <div className={Styles.lista_item_resumen}>
              <p className={Styles.lista_item_resumen_titulo}>
                Nombre
              </p>
              <p className={Styles.lista_item_resumen_nombre}>
                Dr. Alberto Jimenez
              </p>
              <p className={Styles.lista_item_resumen_colaboracion}>
                <span className={Styles.lista_item_resumen_titulo}>Colaboracion</span>
                <span className={Styles.colaboracion}>Angel Duran</span>
              </p>
              <span className={Styles.lista_item_resumen_boton}>
                <Trash
                  onClick={handleAbrirModal}
                  className={Styles.boton_borrar}
                  size={16}
                  strokeWidth={2.5}
                />
              </span>
            </div>
          </div>
          <div className={Styles.lista_item}>
            <div
              className={`${Styles.lista_item_fecha} ${Styles.desactivado}`}
            >
              <span className={Styles.lista_item_fecha_dia}>25</span>
              <div className={Styles.lista_item_fecha_mes_año_contenedor}>
                <span className={Styles.lista_item_fecha_mes}>Feb</span>
                <span className={Styles.lista_item_fecha_año}>2024</span>
              </div>
            </div>
            <div className={Styles.lista_item_resumen}>
              <p className={Styles.lista_item_resumen_titulo}>
                Nombre
              </p>
              <p className={Styles.lista_item_resumen_nombre}>
                Dr. Alberto Jimenez
              </p>
              <p className={Styles.lista_item_resumen_colaboracion}>
                <span className={Styles.lista_item_resumen_titulo}>Colaboracion</span>
                <span className={Styles.colaboracion}>Angel Duran</span>
              </p>
            </div>
          </div>
        </div>
        {/* <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <div className={Styles.contenedor_modal}>
            <div className={Styles.icono_contenedor_modal}>
              <span className={Styles.icono_item_modal}>
                <Trash
                  onClick={handleAbrirModal}
                  className={Styles.icono_modal}
                  size={25}
                  strokeWidth={2.5}
                />
              </span>
            </div>
            <div className={Styles.contenido_contenedor_modal}>
              <span className={Styles.contenido_titulo_modal}>Cancelar</span>
              <span className={Styles.contenido_modal}>
                Esta seguro en cancelar Cita?
              </span>
            </div>
            <div className={Styles.btn_contenedor_modal}>
              <button
                className={Styles.btn_modal}
                type='button'
                onClick={handleCancelarCita}
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal> */}
      </div>
    </>
  )
}

export default index
