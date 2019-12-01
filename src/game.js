
class Game {

  constructor( rows, cols ) {
      this.rows = rows
      this.cols = cols
      this.length = rows * cols
      this.cells = []
      this.initialize() 
      this.flattened = this.cells.flat()
  }

  count( cell ) {
     let cnt = 0
     for( let n of cell.neighbors ) {
       n = this.cells[ n.row ][n.col]
       if( n.value === 1 ) {
          cnt += 1
       }
     }
     return cnt
  }

  initialize() {
    let idx = 0
    for( let rownum = 0; rownum < this.rows; ++rownum ) {
      
      let row = this.cells[rownum] = [] 
      for( let colnum = 0; colnum < this.cols; ++colnum ) {
         let cell = { idx: idx++, row: rownum, col: colnum, value: 0 }
         this.assignNeighbors( cell )
         row.push( cell )
      }
    }
  }

  assignNeighbors(cell) {

    let r = cell.row
    let c = cell.col
    let i = cell.idx

    
    let neighbors =  [
      { idx: i, row: r    , col: c - 1 }, // left
      { idx: i, row: r    , col: c + 1 }, // right
      { idx: i, row: r - 1, col: c     }, // above
      { idx: i, row: r - 1, col: c - 1 }, // aboveLeft
      { idx: i, row: r - 1, col: c + 1 }, // aboveRight
      { idx: i, row: r + 1, col: c     }, // below
      { idx: i, row: r + 1, col: c - 1 }, // belowLeft
      { idx: i, row: r + 1, col: c + 1 }  // belowRight
    ]

    let filter = cell => (
      cell.row >= 0 &&
      cell.row < this.rows &&
      cell.col >= 0 &&
      cell.col < this.cols 
    )
    
    cell.neighbors = neighbors.filter( filter )
  }

  changes() {
     let rv = []
     for( let cell of this.flattened ) {
         let cnt = this.count( cell )
         if( cnt === 3 && cell.value === 0 ) {
           console.log( 'reviving', cell.row, cell.col )
           rv.push( { row: cell.row, col: cell.col, value: 1 } )
           continue
         }
         if( cell.value === 1 && ( cnt > 3 || cnt < 2 ) ) {
           console.log( 'killing', cell.row, cell.col )
           rv.push( { row: cell.row, col: cell.col, value: 0 } )
         }
     }
    return rv
  }

  apply( changes ) {
    let cells = []
    for( let c of changes ) {
       let cell = this.cells[c.row][c.col];
       cell.value = c.value
       cells.push( cell )
    }
    return cells
  }

  advance() {
    return this.apply( this.changes() )
  }
}

export default Game
