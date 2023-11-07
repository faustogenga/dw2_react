import React from 'react'

export const Productitem = () => {
  return (
    <div className='product'>
      <img src='https://i.pinimg.com/originals/06/f6/d6/06f6d667574555163c0ca7a7701ad5eb.jpg'></img>
      <div className='descripcion m-2'>
        <h5>Tacos Puma ULTRA ULTIMATE</h5>
        <p className='m-0'><strong>$220</strong></p>
        <button type="button" className="btn btn-link m-0 p-0">Comprar</button>
      </div>
    </div>
  )
}