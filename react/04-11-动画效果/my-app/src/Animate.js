import React, { Component } from 'react'
import './animate.css'

class Animate extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      show: true
    }
  }
  toggle() {
    this.setState((prevProps) => {
      return {
        show: !prevProps.show
      }
    })
  }
  render() {
    const { toggle } = this
    return (
      <>
        <div className={ this.state.show ? 'show' : 'hide' }>react</div>
        <button onClick={toggle}>toggle</button>
      </>
    )
  }
}

export default Animate
