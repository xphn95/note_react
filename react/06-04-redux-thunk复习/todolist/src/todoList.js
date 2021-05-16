import React, { Component } from 'react'
import TodoListUI from './todoListUI'
import store from './store'
// import axios from 'axios'
import { getInputItemAction, getAddListItemAction, getRemoveListItemAction, getListData } from './store/actionCreator'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = getInputItemAction(e.target.value)
    store.dispatch(action)
  }
  addItem() {
    const action = getAddListItemAction()
    store.dispatch(action)
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
    const action = getListData()
    store.dispatch(action)
  }
  render() {
    const { inputValue, list } = this.state
    const { handleInput, addItem, removeItem } = this
    return (
      <TodoListUI handleInput={handleInput} inputValue={inputValue} list={list} addItem={addItem} removeItem={removeItem}/>
    )
  }
}

export default TodoList
