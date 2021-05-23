import React, { Component } from "react"
import TodoListUI from "./todoListUI"
import store from "./store"
import {
  getInputItemInfoAction,
  getAddListItemAction,
  getDeleteListItemAction,
  getInitListAction,
} from "./store/actionCreators"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.enterAdd = this.enterAdd.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
  }
  handleInput(e) {
    const action = getInputItemInfoAction(e.target.value)
    store.dispatch(action)
  }
  addItem() {
    const action = getAddListItemAction()
    store.dispatch(action)
  }
  enterAdd({ keyCode }) {
    keyCode === 13 && this.addItem()
  }
  deleteItem(index) {
    const action = getDeleteListItemAction(index)
    store.dispatch(action)
  }
  handleChangeStore() {
    this.setState(store.getState())
  }
  componentDidMount() {
    store.subscribe(this.handleChangeStore)
    const action = getInitListAction()
    store.dispatch(action)
  }
  render() {
    const { inputValue, list } = this.state
    const { handleInput, addItem, enterAdd, deleteItem } = this
    return (
      <TodoListUI
        inputValue={inputValue}
        list={list}
        handleInput={handleInput}
        addItem={addItem}
        enterAdd={enterAdd}
        deleteItem={deleteItem}
      />
    )
  }
}

export default TodoList
