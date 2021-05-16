import React from 'react'
import { Input, Button, List } from 'antd'
import 'antd/dist/antd.css'

const TodoListUI = (props) => {
  const { inputValue, list, handleInput, addItem, removeItem } = props
  return (
    <div style={{marginTop: '10px', marginLeft: '10px'}}>
      <Input placeholder="input info" onChange={handleInput} style={{width: '300px', marginRight: '10px'}} value={inputValue}/>
      <Button type="primary" onClick={addItem}>提交</Button>
      <List bordered style={{ marginTop: '10px', width: '300px' }} dataSource={list} renderItem={(item, index) => {
        return <List.Item onClick={() => removeItem(index)}>{item}</List.Item>
      }}/>
    </div>
  )
}

export default TodoListUI
