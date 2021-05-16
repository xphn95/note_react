import React, { Component } from "react"
// import { Input, Button, List, Divider, Typography } from "antd"
import { Input, Button, List } from "antd"
import "antd/dist/antd.css"
import store from "./store"

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.addItem = this.addItem.bind(this)
    // 初始化阶段 state 获取 store 中的值
    this.state = store.getState()
  }
  componentDidMount() {
    // 订阅 store 获取新状态
    // 这个过程要放在挂载完成后, 因为这个方法使用了 setState
    // setState 可以在即将接收组件传值, 挂载完毕, 更新完毕, 事件等时候使用, 其他时候使用是禁止或无意义的
    store.subscribe(this.handleStoreChange)
  }
  /* 
    当输入时触发事件, 让 store 修改状态
    这一步修改的效果是贯穿到 reducer 的, store 自动把状态反馈给reducer
    reducer 来做判断是否采用新的状态, 并且返回新的状态, 新状态不是老状态的原地修改, 而是拷贝.
  */
  handleInput(e) {
    // 声明一个对象通知 store 更新状态
    const action = {
      // 必须, 将要执行的动作
      type: "change_input_value",
      value: e.target.value,
    }
    store.dispatch(action)
  }
  handleStoreChange() {
    // console.log('store change')
    this.setState(store.getState())
  }
  addItem() {
    const action = {
      type: 'add_item',
      value: this.state.inputValue
    }
    store.dispatch(action)
  }
  render() {
    return (
      <div style={{ margin: "10px 0 0 10px" }}>
        <Input
          placeholder="todo info"
          style={{ width: "300px", marginRight: "10px" }}
          onChange={this.handleInput}
          value={this.state.inputValue}
        ></Input>
        <Button type="primary" onClick={this.addItem}>提交</Button>
        {/* <Divider orientation="left">Default Size</Divider> */}
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={this.state.list}
          style={{ width: "300px", marginTop: "10px" }}
          renderItem={(item) => (
            <List.Item>
              {/* <Typography.Text mark>[ITEM]</Typography.Text> {item} */}
              {item}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default TodoList
