import React, { Component } from "react"
import { Input, Button, List } from "antd"
import store from "./store"
import "antd/dist/antd.css"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleChangeStore = this.handleChangeStore.bind(this)
    this.addItem = this.addItem.bind(this)
    this.state = store.getState()
  }
  handleInput(e) {
    const action = {
      type: "input_list_item",
      value: e.target.value,
    }
    store.dispatch(action)
  }
  addItem() {
    const action = {
      type: "add_list_item",
    }
    store.dispatch(action)
  }
  removeItem(index) {
    const action = {
      type: 'remove_list_item',
      index
    }
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
      <div style={{ marginLeft: "10px", marginTop: "10px" }}>
        <Input
          placeholder="add info"
          onChange={this.handleInput}
          style={{ marginRight: "10px", width: "300px" }}
          value={this.state.inputValue}
        />
        <Button type="primary" onClick={this.addItem}>
          提交
        </Button>
        <List
          bordered
          style={{ marginTop: "10px", width: "300px" }}
          dataSource={this.state.list}
          renderItem={(item, index) => {
            return <List.Item onClick={this.removeItem.bind(this, index)}>{item}</List.Item>
          }}
        />
      </div>
    )
  }
}

export default TodoList
