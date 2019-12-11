import { createContext } from 'react'

const GameContext = createContext( { interval: undefined, game: undefined, advance: function() {}  } )

export default GameContext
