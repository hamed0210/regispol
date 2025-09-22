import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { Link, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  User,
} from 'lucide-react'

import Styles from './header.module.css'
import Logo from '../../assets/logo.svg'
import { supabase } from '../../supabase/supabase.config'

const index = () => {
  const ref = useRef()
  let location = useLocation()
  const [submenuPerfil, setSubmenuPerfil] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCerrarSesion = async () => {
    setIsSubmitting(!isSubmitting)
    try {
      const { error } = await supabase.auth.signOut()
      setIsSubmitting(!isSubmitting)
    } catch (error) {

    }
  }

  const Submenu = ({ data }) => {
    return (
      <div ref={ref} className={Styles.submenu_container}>
        <ul className={Styles.submenu_menu}>
          {data.map((el, key) => {
            if (el.titulo === 'Cerrar sesión')
              return <button key={key} className={Styles.submenu_item} disabled={isSubmitting} onClick={handleCerrarSesion} type="button">
                {isSubmitting ? <><span className={Styles.loader} /> Cerrando</> : el.titulo}
              </button>
            return (
              <Link to={el.link} key={key} className={Styles.submenu_item}>
                <div className={Styles.submenu_link}>
                  <span className={Styles.submenu_item_title}>{el.titulo}</span>
                </div>
              </Link>
            )
          })}
        </ul>
      </div>
    )
  }

  const handleAbrirSubmenu = (e) => {
    if (e.target.classList.contains('Perfil'))
      if (submenuPerfil) {
        setSubmenuPerfil(false)
      } else {
        setSubmenuPerfil(true)
        if (!e.target.childNodes[2].classList.contains(Styles.active))
          e.target.childNodes[2].classList.add(Styles.active)
      }
  }

  const handleClickOutside = () => {
    setSubmenuPerfil(false)
    if (ref.current.parentNode.childNodes[2].classList.contains(Styles.active))
      ref.current.parentNode.childNodes[2].classList.remove(Styles.active)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <header className={Styles.header_container}>
      <div className={Styles.container}>
        <div className={Styles.logo_contenedor}>
          <Link
            to={'../'}
            className={
              location.pathname === '/'
                ? `${Styles.listItem_logo_container} ${Styles.logo_selected}`
                : `${Styles.listItem_logo_container} ${Styles.logo_no_selected}`
            }
          >
            <span className={`${Styles.listItem_logo}`}>
              <img className={Styles.logo} src={Logo} alt='logo' />
            </span>
          </Link>
        </div>
        <ul className={Styles.list}>
          <Link
            to={'../nuevos'}
            className={
              location.pathname === '/nuevos'
                ? `${Styles.listItem} ${Styles.selected} Nuevos`
                : `${Styles.listItem} ${Styles.no_selected} Nuevos`
            }
          >
            <span className={`${Styles.listItem_nombre}`}>Nuevos</span>
          </Link>
          <Link
            to={'../consultas'}
            className={
              location.pathname === '/consultas'
                ? `${Styles.listItem} ${Styles.selected} Consultas`
                : `${Styles.listItem} ${Styles.no_selected} Consultas`
            }
          >
            <span className={`${Styles.listItem_nombre}`}>Consultas</span>
          </Link>
          <li
            className={
              location.pathname === '/perfil'
                ? `${Styles.listItem} ${Styles.selected} Perfil`
                : `${Styles.listItem} ${Styles.no_selected} Perfil`
            }
            onClick={handleAbrirSubmenu}
          >
            <User size={14} strokeWidth={3} className={Styles.listItem_icon} />
            <span className={`${Styles.listItem_nombre}`}>Perfil</span>
            <span className={`${Styles.btn_avatar}`}>
              <ChevronDown size={14} strokeWidth={3} />
            </span>
            {submenuPerfil ? (
              <Submenu
                data={[
                  // {
                  //   titulo: 'Mi Perfil',
                  //   link: '../perfil',
                  // },
                  // {
                  //   titulo: 'Usuarios',
                  //   link: '../',
                  // },
                  {
                    titulo: 'Cerrar sesión',
                    link: '../login',
                  },
                ]}
              />
            ) : null}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default index
