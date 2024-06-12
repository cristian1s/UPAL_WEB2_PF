import React from 'react'
import './style.css'

export default function InputP({type,text,id,name,error,value='',onChange=()=>{}, readonly=false, required = false,setError}) {
    const onFocus = (e)=>{
        document.getElementById(`lbl_${e.target.id}`).classList.add('focus')
    }
    const onBlur = (e)=> {
        document.getElementById(`lbl_${e.target.id}`).classList.remove('focus')
    }
  return (
    <>
        <div className='group-form'>
            <label className='label' htmlFor={id} id={`lbl_${id}`}>{text}</label>
              <input type={type} name={name} className='input' id={id} onFocus={onFocus} onBlur={onBlur}
                  value={value} onChange={onChange} readOnly={readonly} required={required }
            placeholder={`Your ${text}`}/> 
        </div>
        <span className='span_text' id={`spn_${id}`}>{error}</span>
    </>
  )
}
