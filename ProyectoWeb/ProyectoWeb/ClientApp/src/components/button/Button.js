import React from 'react'
import './style.css'
export default function Button({ type, text, stylebtn, onClick }) {
  return (
      <button type={type} className={`button ${stylebtn}`} onClick={onClick}>{text}</button>
  )
}
