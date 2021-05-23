import React, { Component } from 'react'
import TodoListUI from './todoListUI'
import store from './store'
import { getInputItemAction, getAddItemAction, getRemoveItemAction, /* getInitListDataAction ,*/ getSagaInitListAction } from './store/actionCreators'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.enterAdd = this.enterAdd.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = getInputItemAction(e.target.value)
    store.dispatch(action)
  }
  enterAdd(e) {
    e.keyCode === 13 && this.addItem()
  }
  addItem() {
    const action = getAddItemAction()
    store.dispatch(action)
  }
  removeItem(index) {
    const action = getRemoveItemAction(index)
    store.dispatch(action)
  }
  handleChangeStore() {
    this.setState(store.getState())
  }
  componentDidMount() {
    store.subscribe(this.handleChangeStore)
    // const action = getInitListDataAction()
    const action = getSagaInitListAction()
    // console.log(action)
    store.dispatch(action)
  }
  render() {
    const { inputValue, list } = this.state
    const { handleInput, enterAdd, addItem, removeItem } = this
    return (
      <TodoListUI inputValue={inputValue} list={list} handleInput={handleInput} addItem={addItem} removeItem={removeItem} enterAdd={enterAdd}/>
    )
  }
}

export default TodoList
