import React, { Component } from "react"
import TodoListUI from "./todoListUI"
import { getInputItemInfoAction, getAddListItemAction, getRemoveListItemAction, getInitListDataAction } from "./store/actionCreator"
import store from "./store"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.enterAddItem = this.enterAddItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = getInputItemInfoAction(e.target.value)
    store.dispatch(action)
  }
  addItem() {
    const action = getAddListItemAction()
    store.dispatch(action)
  }
  enterAddItem({keyCode}) {
    keyCode === 13 && this.addItem()
  }
  removeItem(index) {
    const action = getRemoveListItemAction(index)
    store.dispatch(action)
  }
  handleChangeStore() {
    this.setState(store.getState())
  }
  componentDidMount() {
    store.subscribe(this.handleChangeStore)
    const action = getInitListDataAction()
    store.dispatch(action)
  }
  render() {
    const { inputValue, list } = this.state
    const { handleInput, addItem, removeItem, enterAddItem } = this
    return (
      <TodoListUI
        inputValue={inputValue}
        list={list}
        handleInput={handleInput}
        addItem={addItem}
        removeItem={removeItem}
        enterAddItem={enterAddItem}
      />
    )
  }
}

export default TodoList
