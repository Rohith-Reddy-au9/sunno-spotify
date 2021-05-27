import React, { useEffect } from 'react'
import './Toast.css'
const Toast = ({ toast, close }) => {
  useEffect(() => {
    if (!toast) return

    const closeToast = () => {
      setTimeout(() => {
        close()
      }, 2500)
    }

    closeToast()

    return () => clearTimeout(closeToast)
  }, [toast])

  if (!toast) return null

  return (
    <div className="toast" css={CSS}>
      {toast}
    </div>
  )
}

export default Toast
