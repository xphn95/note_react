import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.state = {
      list: []
    }
  }
  addItem() {
    this.setState((prevState) => {
      return {
        list: [...prevState.list, 'item']
      }
    })
  }
  render() {
    const { addItem } = this
    const { list } = this.state
    return (
      <>
        <TransitionGroup>
          {
            list.map((item, index) => {
              return (
                <CSSTransition timeout={1000} classNames='fade' onEntered={ el => el.style.color = 'red' } appear={true} key={index}>
                  <div >{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
        <button onClick={addItem}>添加</button>
      </>
    );
  }
}

export default App
