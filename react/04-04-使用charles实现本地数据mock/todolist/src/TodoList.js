import React, { Component } from "react"
import axios from "axios"
import Item from "./Item"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.inputText = this.inputText.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.state = {
      list: ["学英语", "学前端"],
      inputValue: "",
    }
  }
  inputText(e) {
    const inputValue = e.target.value
    this.setState(() => {
      return {
        inputValue,
      }
    })
  }
  addItem() {
    this.setState((prevProps) => {
      return {
        list: [...prevProps.list, prevProps.inputValue],
        inputValue: "",
      }
    })
  }
  deleteItem(index) {
    this.setState((prevProps) => {
      const list = [...prevProps.list]
      list.splice(index, 1)
      return {
        list,
      }
    })
  }
  getList() {
    const { inputText, addItem, deleteItem } = this
    const { inputValue } = this.state
    return (
      <>
        <div>
          <input type="text" value={inputValue} onChange={inputText} />
          <button onClick={addItem}>提交</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => {
            return (
              <Item
                content={item}
                key={index}
                index={index}
                deleteItem={deleteItem}
              ></Item>
            )
          })}
        </ul>
      </>
    )
  }
  componentDidMount() {
    axios
      .get("http://localhost.charlesproxy.com:3000/api/todolist")
      .then((res) => {
        console.log(res.data)
        this.setState(() => {
          return {
            list: [...res.data]
          }
        })
      })
      .catch((err) => {
        console.log("error")
      })
  }
  render() {
    return this.getList()
  }
}

export default TodoList
