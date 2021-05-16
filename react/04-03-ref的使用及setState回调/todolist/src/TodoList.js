import React, { Component } from "react"
import Item from "./Item"

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
    // 可以使用 ref 的方式来代替 e 的方式
    // const inputValue = e.target.value
    this.setState(() => {
      return {
        // inputValue,
        inputValue: this.input.value,
      }
    })
    // console.log(this.input)
  }
  addItem() {
    this.setState(
      (prevState) => {
        return {
          list: [...prevState.list, prevState.inputValue],
          inputValue: "",
        }
      },
      () => {
        console.log(this.ul.querySelectorAll("li").length)
      }
    )
    // console.log(this.ul.querySelectorAll("li").length) // 此时打印的 Item 数量总是上一次的状态, 因为 setState 是异步的, 解决办法是使用 setState 的第二个参数, 这个参数是更新 state 后的回调函数.
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
  /* componentWillMount() {
    console.log("fa will mount, 新生命周期不用了")
  }
  componentDidMount() {
    console.log("fa did mount")
  }
  shouldComponentUpdate() {
    console.log("fa should update")
    return true
  }
  componentWillUpdate() {
    console.log("fa will update")
  }
  componentDidUpdate() {
    console.log("fa did update")
  } */
  render() {
    console.log("fa render")
    const { inputValue, list } = this.state
    const { handleInput, addItem, deleteItem } = this
    return (
      <>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInput}
            ref={(input) => (this.input = input)}
          />
          <button onClick={addItem}>提交</button>
        </div>
        <ul ref={(ul) => (this.ul = ul)}>
          {list.map((item, index) => {
            return (
              <Item
                content={item}
                key={index}
                deleteItem={deleteItem}
                index={index}
              ></Item>
            )
          })}
        </ul>
      </>
    )
  }
}

export default TodoList
