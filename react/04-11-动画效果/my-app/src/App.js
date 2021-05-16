import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      show: true
    }
  }
  toggle() {
    this.setState((prevState) => {
      return {
        show: !prevState.show
      }
    })
  }
  render() {
    const { toggle } = this
    const { show } = this.state
    return (
      <>
        <div style={{ opacity: +show, transition: 'all 1s ease-in' }}>hello</div>
        <button onClick={toggle}>toggle</button>
      </>
    )
  }
}

export default App
