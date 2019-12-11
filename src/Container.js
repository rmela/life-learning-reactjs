import React, { useContext, useState } from 'react'
import Cell from './Cell'
import { Button } from './Buttons'
import GameContext from './GameContext'
import Game from './game'
import './styles/Container.css'

export default function Container( props ) {

  let ctx = useContext( GameContext )

  let cells = []
  let rows = ctx.game.cells.forEach( (row,rownum) => {
    row.forEach( (col,colnum) => {
        let ckey = `r${rownum}c${colnum}`
        cells.push( <Cell key={ ckey } row={ rownum } col={ colnum } /> )
    })
  })

  function onReset(foo) {
     for( let cell of cells ) console.log( cell )
  }

  return (
    <div>
      <Button id='reset' label="Reset" onClick={ onReset  }/>
      <div id="container" className="container">{cells}</div>
    </div>
  )
  

}
