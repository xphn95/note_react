import React, { Component } from 'react'
import store from './store'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'
import TodoListUI from './todolistUI'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }
  addItem() {
    const action = getAddItemAction()
    store.dispatch(action)
  }
  removeItem(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
  handleChangeStore() {
    this.setState(store.getState())
  }
  componentDidMount() {
    store.subscribe(this.handleChangeStore)
  }
  render() {
    const { inputValue, list } = this.state
    const { handleInput, addItem, removeItem } = this
    return <TodoListUI inputValue={inputValue} handleInput={handleInput} addItem={addItem} list={list} removeItem={removeItem}/>
  }
}

export default TodoList
