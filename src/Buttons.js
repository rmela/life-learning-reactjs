import React from 'react'

export class Button extends React.Component {
  
  constructor( props ) {
    if( !props.router || !props.eventName || !props.label ) {
      throw new Error( 'Button requires "router", "eventName", and "label"' )
    }
    super( props )
  }

  render() {
    return <button onClick={this.onClick.bind(this) }>{this.props.label}</button>
  }

  onClick( evt ) {
    this.props.router.emit( this.props.eventName, this.props.label )
  }

}

export class ToggleButton extends React.Component {

  constructor(props) {
     super(props)
     this._on = { on: true, label: 'Stop' }
     this._off = { on: false, label: 'Start' }
     this.state = this._off
  }

  componentWillUnount() {
     this.props.router.removeListener( 'reset', this.reset )
  }
  componentDidMount() {
     this.props.router.on( 'reset', this.reset.bind(this) )
  }

  reset() {
    this.setState( this._off )
  }

  render() {
     return <button onClick={this.toggle.bind(this) }>{this.state.label}</button>
  }

  componentDidUpdate() {
    this.props.router && this.props.router.emit( this.props.eventName, this.state.on )
  }

  toggle() {
    let state = this.state.on ? this._off : this._on 
    this.setState( state )
  }


}
