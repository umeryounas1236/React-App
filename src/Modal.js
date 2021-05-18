import React, { useEffect } from 'react'

const Modal = ({ modalcontent, closemodal }) => {
  useEffect(() => {
    setTimeout(() => {
      closemodal()
    }, 3000)
  })
  return <p className='model-content'>{modalcontent}</p>
}

export default Modal