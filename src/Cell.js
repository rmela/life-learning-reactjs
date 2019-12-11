import React, { useState, useContext } from 'react'
import GameContext from './GameContext'
import './styles/Cell.css'


function _Cell( props ) {
  let ctx = useContext( GameContext )
  let data = ctx.game.cells[ props.row ][props.col]
  const [ value, setValue ] = useState(data.value)
  function onClick() {
     let cell = ctx.game.cells[ props.row][ props.col ]
     setValue( cell.value = value ? 0 : 1 )
  }
  return (
    <div className={ value ? 'App-cell active' : 'App-cell inactive' } onClick={onClick}>{ "\u2b24" }</div>
   )
}


export default function Cell(props) {
   try {
     return _Cell(props)
   } catch( err ) {
     console.error( err )
     process.exit(0)
   }
}

//export default Cell
