import React from 'react'
import { useSelector } from 'react-redux'

function BillionaireItem({billionaire}) {

  const {person, squareImage, source, finalWorth, bios} = billionaire

  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  const netWorth = internationalNumberFormat.format(finalWorth/1000)

 

  return (
<div className="card md:card-side bg-base-100 shadow-xl">
  <figure>
    <img
      className='rounded-xl m-5' 
      src={squareImage}/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{person.name}</h2>
    <p>${netWorth} Billion </p>
    <p>{source.toUpperCase()}</p>
    <ul>
    {
    bios
    }
    </ul>
  </div>
</div>
  )
}

export default BillionaireItem