import { useState } from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/es';
import { X } from 'lucide-react';

dayjs.locale('es');

import Styles from './consultasModal.module.css'
import Modal from '../../hooks/modalHook'
import BorrarModal from './borrarModal'

const consultasModal = ({ data, isModalOpen, setModalOpen }) => {

  const [isModalBorrarOpen, setModalBorrarOpen] = useState(false)

  const handleBorrar = () => {
    setModalBorrarOpen(true)
  }

  const handleOnCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
      >
        <div className={Styles.contenedor_modal}>
          <button className={Styles.btn_cerrar_modal} type="button" onClick={handleOnCloseModal}><X size={20} strokeWidth={3} /></button>
          <h2 className={Styles.titulo_contenedor_modal}>Detalle</h2>
          <div className={Styles.person_contenedor_modal}>
            <div className={Styles.item_contenedor_modal}>
              <span className={Styles.label_modal}>Nombres</span>
              <p className={Styles.item_modal}>
                {data ? `${data.persons.names} ${data.persons.surnames}` : '-'}
              </p>
            </div>
            <div className={Styles.contenedor_horizontal_modal}>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Tipo ID</span>
                <p className={Styles.item_modal}>
                  {data ? data.persons.type_id : '-'}
                </p>
              </div>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>No. ID</span>
                <p className={Styles.item_modal}>
                  {data ? data.persons.id : '-'}
                </p>
              </div>
            </div>
            <div className={Styles.contenedor_horizontal_modal}>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Celular</span>
                <p className={Styles.item_modal}>
                  {data ? data.persons.cel : '-'}
                </p>
              </div>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Direccion</span>
                <p className={Styles.item_modal}>
                  {data ? data.persons.address : '-'}
                </p>
              </div>
            </div>
            <div className={Styles.item_contenedor_modal}>
              <span className={Styles.label_modal}>Email</span>
              <p className={Styles.item_modal}>
                {data ?
                  data.persons.email ? data.persons.email : '-'
                  : '-'}
              </p>
            </div>
          </div>
          <div className={Styles.colab_contenedor_modal}>
            <div className={Styles.item_contenedor_modal}>
              <span className={Styles.label_modal}>Colaboracion</span>
              <p className={Styles.item_modal}>
                {data ?
                  data.collab ? data.collab : '-'
                  : '-'}
              </p>
            </div>
            <div className={Styles.contenedor_horizontal_modal}>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Fecha de Entrega</span>
                <p className={Styles.item_modal}>
                  {data ?
                    data.date_collab ? dayjs(data.date_collab).format('DD MMMM YYYY') : '-'
                    : '-'}
                </p>
              </div>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Entregado Por</span>
                <p className={Styles.item_modal}>
                  {data ?
                    data.delivered_by ? data.delivered_by : '-'
                    : '-'}
                </p>
              </div>
            </div>
          </div>
          <div className={Styles.btn_contenedor_modal}>
            <button className={`${Styles.btn_modal} ${Styles.btn_editar_modal}`} type="button" >Editar</button>
            <button className={`${Styles.btn_modal} ${Styles.btn_borrar_modal}`} type="button" onClick={handleBorrar}>Borrar</button>
          </div>
        </div>
      </Modal>
      <BorrarModal data={data} isModalBorrarOpen={isModalBorrarOpen} setModalBorrarOpen={setModalBorrarOpen} />
    </>
  )
}

export default consultasModal
