import { useEffect, useState } from 'react'
import { Trash } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import dayjs from 'dayjs'
import 'dayjs/locale/es';

dayjs.locale('es');

import Styles from './consultas.module.css'
import { useColaboracionesStore } from '../../store/colaboracionesStore'
import Modal from '../../hooks/modalHook'

const index = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [contentModal, setContentModal] = useState(null)
  const { getCollabs, colaboraciones, loading } = useColaboracionesStore()

  useEffect(() => {
    getCollabs()
  }, [getCollabs]);

  // const notificacion = () =>
  //   toast.success('Cita eliminada con exito', {
  //     theme: 'light',
  //     pauseOnHover: false,
  //     closeOnClick: true,
  //     closeButton: false,
  //     pauseOnFocusLoss: false,
  //     autoClose: 3000,
  //   })

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
          {
            loading
              ? <div className={Styles.loader_container}><span className={Styles.loader} /></div>
              : !colaboraciones
                ? <p className={Styles.no_resgistros_container}>No hay registros guardados</p>
                : colaboraciones.map((colab) => (
                  <div
                    key={colab.cod}
                    className={Styles.lista_item}
                    onClick={() => {
                      setModalOpen(true)
                      setContentModal(colab)
                    }}
                  >
                    <div className={`${Styles.lista_item_fecha} ${Styles.activo}`}>
                      <span className={Styles.lista_item_fecha_dia}>{
                        colab.date_collab ? dayjs(colab.date_collab).format('DD') : '00'
                      }</span>
                      <div className={Styles.lista_item_fecha_mes_año_contenedor}>
                        <span className={Styles.lista_item_fecha_mes}>{
                          colab.date_collab ? dayjs(colab.date_collab).format('MMM') : '000'
                        }</span>
                        <span className={Styles.lista_item_fecha_año}>{
                          colab.date_collab ? dayjs(colab.date_collab).format('YYYY') : '0000'
                        }</span>
                      </div>
                    </div>
                    <div className={Styles.lista_item_resumen}>
                      <p className={Styles.lista_item_resumen_titulo}>Nombres</p>
                      <p className={Styles.lista_item_resumen_nombre}>
                        {`${colab.persons.names} ${colab.persons.surnames}`}
                      </p>
                      <p className={Styles.lista_item_resumen_colaboracion}>
                        <span className={Styles.lista_item_resumen_titulo}>Colaboracion</span>
                        <span className={Styles.colaboracion}>{colab.collab}</span>
                      </p>
                      {/* <span className={Styles.lista_item_resumen_boton}>
                    <Trash
                      onClick={handleAbrirModal}
                      className={Styles.boton_borrar}
                      size={16}
                      strokeWidth={2.5}
                    />
                  </span> */}
                    </div>
                  </div>
                ))
          }
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false)
          }}
        >
          <div className={Styles.contenedor_modal}>
            <h2 className={Styles.titulo_contenedor_modal}>Detalle</h2>
            <div className={Styles.person_contenedor_modal}>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Nombres</span>
                <p className={Styles.item_modal}>Hamed Duran</p>
              </div>
              <div className={Styles.contenedor_horizontal_modal}>
                <div className={Styles.item_contenedor_modal}>
                  <span className={Styles.label_modal}>Tipo ID</span>
                  <p className={Styles.item_modal}>CC</p>
                </div>
                <div className={Styles.item_contenedor_modal}>
                  <span className={Styles.label_modal}>No. ID</span>
                  <p className={Styles.item_modal}>1046814387</p>
                </div>
              </div>
              <div className={Styles.contenedor_horizontal_modal}>
                <div className={Styles.item_contenedor_modal}>
                  <span className={Styles.label_modal}>Celular</span>
                  <p className={Styles.item_modal}>3007725093</p>
                </div>
                <div className={Styles.item_contenedor_modal}>
                  <span className={Styles.label_modal}>Direccion</span>
                  <p className={Styles.item_modal}>Calle 5 # 3 - 45</p>
                </div>
              </div>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Email</span>
                <p className={Styles.item_modal}>hduran0210@gmail.com</p>
              </div>
            </div>
            <div className={Styles.colab_contenedor_modal}>
              <div className={Styles.item_contenedor_modal}>
                <span className={Styles.label_modal}>Colaboracion</span>
                <p className={Styles.item_modal}>Entregados 100 mil Pesos</p>
              </div>
              <div className={Styles.contenedor_horizontal_modal}>
                <div className={Styles.item_contenedor_modal}>
                  <span className={Styles.label_modal}>Fecha de Entrega</span>
                  <p className={Styles.item_modal}>10 Feb 2025</p>
                </div>
                <div className={Styles.item_contenedor_modal}>
                  <span className={Styles.label_modal}>Entregado Por</span>
                  <p className={Styles.item_modal}>Dimas</p>
                </div>
              </div>
            </div>
            <div className={Styles.btn_contenedor_modal}>
              <button className={`${Styles.btn_modal} ${Styles.btn_editar_modal}`} type="button">Editar</button>
              <button className={`${Styles.btn_modal} ${Styles.btn_borrar_modal}`} type="button">Borrar</button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default index
