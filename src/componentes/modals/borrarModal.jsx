import { Trash } from 'lucide-react';
import { toast } from 'react-toastify'

import Styles from './borrarModal.module.css'
import Modal from '../../hooks/modalHook'
import { useColaboracionesStore } from '../../store/colaboracionesStore'

const borrarModal = ({ data, setModalOpenConsultas, isModalBorrarOpen, setModalBorrarOpen }) => {

  const { loading, deleteCollab } = useColaboracionesStore()

  const notificacionSuccess = (message) =>
    toast.success(message, {
      theme: 'light',
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
      closeButton: false,
      autoClose: 3000,
    })

  const notificacionError = (message) =>
    toast.error(message, {
      theme: 'light',
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      closeOnClick: true,
      closeButton: false,
      autoClose: 3000,
    })

  const handleCancelar = () => {
    setModalBorrarOpen(false)
  }

  const handleBorrar = async () => {
    try {
      deleteCollab(data.cod, { notificacionSuccess, notificacionError })
    } catch (error) {
      console.log(error)
    } finally {
      setModalBorrarOpen(false)
      setModalOpenConsultas(false)
    }
  }

  return (
    <>
      <Modal
        isOpen={isModalBorrarOpen}
      >
        <div className={Styles.contenedor_modal}>
          <div className={Styles.icono_contenedor_modal}>
            <span className={Styles.icono_item_modal}>
              <Trash
                className={Styles.icono_modal}
                size={25}
                strokeWidth={2.5}
              />
            </span>
          </div>
          <div className={Styles.contenido_contenedor_modal}>
            <span className={Styles.contenido_titulo_modal}>Eliminar</span>
            <span className={Styles.contenido_modal}>
              Esta seguro que desea eliminar este registro?
            </span>
          </div>
          <div className={Styles.btn_contenedor_modal}>
            <button
              className={`${Styles.btn_modal} ${Styles.btn_confirmar_modal}`}
              type='button'
              disabled={loading}
              onClick={handleBorrar}
            >
              {loading ? <><span className={Styles.loader} /> Borrando</> : "Confirmar"}
            </button>
            <button
              className={`${Styles.btn_modal} ${Styles.btn_cancelar_modal}`}
              type='button'
              disabled={loading}
              onClick={handleCancelar}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default borrarModal
