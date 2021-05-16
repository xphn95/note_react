import React, { Component } from 'react'
import { Input, Button, List } from 'antd'
import store from './store'
import 'antd/dist/antd.css'
import { getAddItemAction, getInputChangeAction, getRemoveItemAction } from './store/actionCreators'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    this.addItem = this.addItem.bind(this)
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
    const action = getRemoveItemAction(index)
    store.dispatch(action)
  }
  handleChangeStore() {
    this.setState(store.getState())
  }
  componentDidMount() {
    store.subscribe(this.handleChangeStore)
  }
  render() {
    return (
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <Input placeholder='input item info' onChange={this.handleInput} value={this.state.inputValue} style={{width: '300px', marginRight: '10px'}}/>
        <Button type="primary" onClick={this.addItem}>提交</Button>
        <List bordered dataSource={this.state.list} style={{ marginTop: '10px', width: '300px' }} renderItem={
          (item, index) => {
            return <List.Item onClick={this.removeItem.bind(this, index)}>{item}</List.Item>
          }
        } />
      </div>
    )
  }
}

export default TodoList