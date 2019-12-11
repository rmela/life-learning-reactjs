import React, { useContext }  from 'react'
import Game from './game'
import { ToggleButton, Button } from './Buttons'
import GameContext from './GameContext' 
import Container from './Container'
import './styles/App.css'

function App(props) {

   const initial = useContext( GameContext )
   initial.game = new Game( 30, 30 )
   return (
         <div>
           <ToggleButton on="Start" off="Stop" />
           <Container />
        </div>
   )

}


export default App;
