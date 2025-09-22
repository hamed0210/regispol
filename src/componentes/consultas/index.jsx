import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import dayjs from 'dayjs'
import 'dayjs/locale/es';

dayjs.locale('es');

import Styles from './consultas.module.css'
import { useColaboracionesStore } from '../../store/colaboracionesStore'
import ConsultasModal from '../modals/consultasModal'

const index = () => {
  const [searchInput, setSearchInput] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [contentModal, setContentModal] = useState(null)
  const { getCollabs, colaboraciones, loading } = useColaboracionesStore()

  useEffect(() => {
    getCollabs()
  }, [getCollabs]);

  const filteredColaboraciones = colaboraciones.filter(item => {
    // 1. Convertimos el texto del input a minúsculas, eliminamos espacios extras y lo dividimos por espacios
    const terms = searchInput.toLowerCase().trim().split(' ').filter(Boolean) // .filter(Boolean) eliminamos términos vacíos (por si hay doble espacio o input vacío)
    // 2. Filtramos las colaboraciones que cumplan con TODOS los términos de búsqueda
    return terms.every(term =>
      // Verificamos si el término está contenido en alguno de los siguientes campos:
      item.persons.names.toLowerCase().includes(term) || item.persons.surnames.toLowerCase().includes(term) || item.persons.id.toString().toLowerCase().includes(term)
    )
  });

  const handleBuscar = (e) => {
    colaboraciones.filter(item =>
      item.persons.names.toLowerCase().includes(e.target.value.toLowerCase())
    )
    console.log(colaboraciones)
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
          {/* <div className={Styles.fechas_busqueda_contenedor}>
            <span className={Styles.fecha_busqueda_titulo}>
              Buscar por rango
            </span>
            <div className={Styles.fecha_busqueda_inputs}>
              <input className={Styles.input} type='date' />
              <input className={Styles.input} type='date' />
            </div>
          </div> */}
          <div>
            <input
              className={Styles.input}
              type='text'
              onChange={(e) => setSearchInput(e.target.value)}
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
                : filteredColaboraciones.map((colab) => (
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
                    </div>
                  </div>
                ))
          }
        </div>
        <ConsultasModal data={contentModal} isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      </div>
    </>
  )
}

export default index
