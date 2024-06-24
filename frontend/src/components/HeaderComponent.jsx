import React from 'react'

function HeaderComponent({label}) {
  return (
    <div className='bg-black text-bold fw-500 text-4xl p-3'>
      {label}
    </div>
  )
}

export default HeaderComponent
