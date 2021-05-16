import React, { Component } from "react"
import { CSSTransition } from "react-transition-group"
import "./app.css"

class App extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      show: true,
    }
  }
  toggle() {
    this.setState((prevState) => {
      return {
        show: !prevState.show,
      }
    })
  }
  render() {
    const { toggle } = this
    const { show } = this.state
    return (
      <>
        <CSSTransition
          // 监视控制过渡的状态
          in={show}
          // 过渡效果的执行时间
          timeout={1000}
          // 类名标识
          classNames="fade"
          // 入场动画执行完的钩子函数
          onEntered={(el) => {
            el.style.color = "red"
          }}
          appear={true}
        >
          <div>hello</div>
        </CSSTransition>
        <button onClick={toggle}>toggle</button>
      </>
    )
  }
}

export default App
