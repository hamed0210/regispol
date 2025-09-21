import { Trash } from 'lucide-react';

import Styles from './borrarModal.module.css'
import { useColaboracionesStore } from '../../store/colaboracionesStore'
import Modal from '../../hooks/modalHook'

const borrarModal = ({ data, isModalBorrarOpen, setModalBorrarOpen }) => {

  const { getCollabs, colaboraciones, loading } = useColaboracionesStore()

  const handleCancelar = () => {
    setModalBorrarOpen(false)
  }

  return (
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
          // onClick={handleCancelarCita}
          >
            Confirmar
          </button>
          <button
            className={`${Styles.btn_modal} ${Styles.btn_cancelar_modal}`}
            type='button'
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default borrarModal
