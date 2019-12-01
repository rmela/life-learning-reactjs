import EventEmitter from 'events'
import { Button, ToggleButton } from './Buttons'
import React  from 'react'
import Game from './game'
import Cell from './Cell'
import './App.css'

class Router extends EventEmitter {

   constructor( patterns = [] ) {
      super()
      
      if( !patterns.length )
         return

      this.patterns = patterns.join( ')|(' )
      this.patterns = new RegExp( `(${this.patterns})` )
   }

   emit( tag, data ) {
      super.emit( tag, data )
      if( this.patterns && tag.match( this.patterns ) )
         console.log( 'router', tag, data )
   }
}

const router = new Router( [ 'cell.*', 'onoff' ])

class Table extends React.Component {


  constructor( props ) {
    super( props )
    this.rows = props.rows
    this.cols = props.cols
    this.game = new Game( this.rows, this.cols )

    this.state = { game: this.game, rows: this.rows, cols: this.cols }
  }

  componentDidMount() {
    router.on('onoff', this.toggleInterval.bind( this ) )
    router.on('reset', this.reset.bind( this ) )
    router.on('cell.clicked', this.cellClicked.bind( this ) )
  }

  reset() {
    if( this.interval ) {
       clearInterval( this.interval )
       this.interval = null
    }
    for( let cell of this.state.game.flattened ) { cell.value = 0 }
    this.setState( { game: this.game } )
  }

  cellClicked( cell ) {
     cell.value = cell.value === 0 ? 1 : 0
     this.setState( { game: this.game } )
  }



  toggleInterval(on) {
    console.log( 'toggelInterval', on )
    if( this.interval ) {
      clearInterval( this.interval )
      this.interval = null
    }
    if( on ) {
      this.interval = setInterval( () => this.advance(), 1000 )
    }
  }

  advance() {
    let changes = this.game.advance()
    changes.length && this.setState( { game: this.game } )
  }

  render() {

    let cells = this.state.game.cells

    let rows = cells.map( (row,rownum) => {
      let cols = row.map( (col, colnum) => {
        let ckey = `r${rownum}c${colnum}`
        return <Cell key={ ckey } router={router} data={col} />
      })
      let rkey = `r${rownum}`
      return <tr key={ rkey } >{cols}</tr>
    })
    return (
        <table><tbody>{rows}</tbody></table>
    )

  }

}

function App(props) {


   return (<div className="App-container" > 
      <ToggleButton router={router} eventName="onoff" />
      <Button router={router} eventName="reset" label="Reset"  />
      <Table rows={30} cols={30} />
   </div> )

}


export default App;
