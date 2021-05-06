import React, { Component } from "react"
import ListItem from "./ListItem"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.state = {
      inputValue: "",
      list: ["学英语", "学前端"],
    }
  }
  handleInput(e) {
    const inputValue = e.target.value
    this.setState(() => ({
      inputValue,
    }))
  }
  addItem() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: "",
    }))
  }
  deleteItem(index) {
    this.setState((prevState) => {
      const list = [...prevState.list]
      list.splice(index, 1)
      return {
        list,
      }
    })
  }
  getItem() {
    return this.state.list.map((item, index) => {
      return (
        <ListItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.deleteItem}
        ></ListItem>
      )
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
        <ul>{this.getItem()}</ul>
      </>
    )
  }
}

export default TodoList
