// import React, { Component } from 'react'
import { Input, Button, List } from 'antd'
import 'antd/dist/antd.css'

const TodoListUI = (props) => {
  const { inputValue, handleInput, addItem, removeItem, list } = props
  return (
    <div style={{marginTop: '10px', marginLeft: '10px'}}>
      <Input placeholder="input info" onChange={handleInput} value={inputValue} style={{width: '300px', marginRight: '10px'}}/>
      <Button type="primary" onClick={addItem}>提交</Button>
      <List bordered style={{ marginTop: '10px', width: '300px' }} dataSource={list} renderItem={(item, index) => {
        return <List.Item onClick={() => {removeItem(index)}}>{item}</List.Item>
      }}/>
    </div>
  )
}

/* class TodoListUI extends Component {
  render() {
    
  }
} */

export default TodoListUI
