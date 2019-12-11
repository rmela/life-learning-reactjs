import React, { useContext, useState } from 'react'
import GameContext from './GameContext'
import Game from './game'

export function Button( props ) {

  if( !props.id ) throw new Error('missing props.id to button')
  let ctx = useContext( GameContext )
  
  function onClick(tgt) {
     ctx.game = new Game( ctx.game.rows, ctx.game.cols )
     props.onClick && props.onClick(props.id)
  }
  return <button onClick={ onClick } >{props.label}</button>

}

export function ToggleButton( props ) {

  console.log( 'ToggleButtonButton 1', props )
  let ctx = useContext( GameContext )
  console.log( 'ToggleButtonButton 2', props )

  const [ running, setRunning ] = useState( false  )

  function onClick() {
     ctx.interval && clearInterval( ctx.interval )
     if( running ) {
        setRunning( false )
        
     } else {
        ctx.interval = setInterval( function() { ctx.game.advance() }, ctx.sleep || 1000 )
        setRunning( true )
     }
  }

  return <button onClick={onClick}>{ running ? props.off : props.on }</button>

}
