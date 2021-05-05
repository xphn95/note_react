import React, { Component } from "react"
import ListItem from "./ListItem"

class TodoList extends Component {
  constructor(props) {
    super(props)
    // 事件方法不管是本组件自己使用还是传给子组件使用都需要注意 this 指向.
    // 这个绑定 this 的操作写在 constructor 中比较好
    // 一个是性能好些, 另一个是 JSX 中使用这些方法更简化可读性更好
    this.addItem = this.addItem.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.state = {
      list: ["学英语", "学前端"],
      inputValue: "",
    }
  }
  addItem() {
    const list = [...this.state.list, this.state.inputValue]
    this.setState({
      list,
      inputValue: "",
    })
  }
  handleInput(e) {
    this.setState({
      inputValue: e.target.value,
    })
  }
  removeItem(index) {
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list,
    })
  }
  render() {
    return (
      <>
        <div>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInput}
          />
          <button onClick={this.addItem}>提交</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <ListItem
                key={index}
                content={item}
                index={index}
                deleteItem={this.removeItem}
              ></ListItem>
            )
          })}
        </ul>
      </>
    )
  }
}

export default TodoList
