import React, { Component } from "react"
import { Input, Button, List } from "antd"
import store from './store'
import "antd/dist/antd.css"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.addItem = this.addItem.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = {
      type: 'input_list_item',
      value: e.target.value
    }
    store.dispatch(action)
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  addItem() {
    const action = {
      type: 'add_list_item'
    }
    store.dispatch(action)
  }
  componentDidMount() {
    store.subscribe(this.handleStoreChange)
  }
  render() {
    return (
      <div style={{ marginLeft: "10px", marginTop: "10px" }}>
        <Input
          placeholder="input info"
          style={{ width: "300px", marginRight: "10px" }} value={this.state.inputValue} 
          onChange={this.handleInput}
        />
        <Button type="primary" onClick={this.addItem}>添加</Button>
        <List
          bordered
          style={{ width: "300px", marginTop: "10px" }}
          dataSource={this.state.list}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    )
  }
}

export default TodoList
