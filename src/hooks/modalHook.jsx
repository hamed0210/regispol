import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useOnClickOutside } from 'usehooks-ts'

import Styles from './modalHook.module.css'

const modalHook = ({ isOpen, onClose, children }) => {
  const refModal = useRef()

  const handleClickOutside = () => {
    onClose()
  }

  useOnClickOutside(refModal, handleClickOutside)

  if (!isOpen) return null

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
      }}
    >
      <div className={Styles.modal} ref={refModal}>
        <div className={Styles.children_container}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default modalHook
