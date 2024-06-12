import React from 'react'
import './style.css'

export default function Select({text,id,name,error,options=[],onChange,selected}) {
  return (
    <>
        <div className='group-form'>
              <label className='label' for={id} id={`lbl_${id}`}>{text}</label>
              <select className='select' id={id} placeholder={`Your ${text}`} name={name} onChange={onChange} >
                <option value="Select">Select</option>
                {
                   options.map(option => {
                       return <option key={option.value} value={option.value} selected={(option.value === selected ? true : "")}
                           data-ref={(option.data_r !== undefined || option.data_r != null) ? option.data_r : ''}
                           data-max={(option.data_max !== undefined || option.data_max != null) ? option.data_max : ''}
                       >{option.text}</option>
                    })
                }
            </select>
        </div>
        <span className='span_text' for={id} id={`spn_${id}`}>{error}</span>
    </>
  )
}
