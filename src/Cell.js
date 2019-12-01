import React from 'react'

class Cell extends React.Component {

  constructor( props ) {
     super(props)
     this.active = props.active ? props.active : "\u2b24"
     this.inactive = props.inactive ? props.inactive : ' '
     this.value = props.data.value
     this.onClick = this.clickHandler.bind( this )
  }

  shouldComponentUpdate( nextProps, nextState ) {
     return this.value !== nextProps.data.value
  }

  componentDidUpdate() {
     console.log( 'Cell didUpdate', this.props.data )
     this.value = this.props.data.value
  }

  clickHandler() {
    this.props.router.emit( 'cell.clicked', this.props.data )
  }

  render() {
    let className = this.props.data.value ? 'App-cell active' : 'App-cell inactive'
    return (
      <td className={ className } onClick={this.onClick}>
         { this.props.active ? "\u2b24" : " " }
      </td>
    )
  }
}

export default Cell
