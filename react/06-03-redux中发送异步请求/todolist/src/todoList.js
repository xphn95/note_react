import React, { Component } from 'react'
import store from './store'
// import axios from 'axios'
import { getInputInfoAction, getAddListItemAction, getRemoveListItemAction, getTodoList } from './store/actionCreators'
import TodoListUI from './todoListUI'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    // this.initStoreList = this.initStoreList.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = getInputInfoAction(e.target.value)
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
  /* initStoreList(data) {
    const action = getInitListAction(data)
    store.dispatch(action)
  } */
  handleChangeStore() {
    this.setState(store.getState())
  }
  componentDidMount() {
    store.subscribe(this.handleChangeStore)
    /* axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        const data = []
        res.data.slice(0, 5).map(item => {
          data.push(item.title)
          return true
        })
        this.initStoreList(data)
        // console.log(data)
      })
      .catch((err) => {
        console.log('error')
      }) */
    const action = getTodoList()
    store.dispatch(action)
  }
  render() {
    const { inputValue, list } = this.state
    const { handleInput, addItem, removeItem } = this
    return <TodoListUI inputValue={inputValue} list={list} handleInput={handleInput} addItem={addItem} removeItem={removeItem}/>
  }
}

export default TodoList
