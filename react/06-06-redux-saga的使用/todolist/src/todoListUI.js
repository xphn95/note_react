import React from 'react'
import { Input, Button, List } from 'antd'
import 'antd/dist/antd.css'

const TodoListUI = (props) => {
  const { inputValue, list, handleInput, enterAdd, addItem, removeItem } = props
  return (
    <div style={{marginTop: '10px', marginLeft: '10px'}}>
      <Input placeholder="input info" onChange={handleInput} onKeyUp={enterAdd} value={inputValue} style={{width: '300px', marginRight: '10px'}}/>
      <Button type="primary" onClick={addItem}>提交</Button>
      <List bordered style={{ width: '300px', marginTop: '10px' }} dataSource={list} renderItem={(item, index) => (
        <List.Item onClick={() => removeItem(index)}>{item}</List.Item>
      )}/>
    </div>
  )
}

export default TodoListUI
