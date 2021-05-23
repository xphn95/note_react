import React from "react"
import { Input, Button, List } from "antd"
import "antd/dist/antd.css"

const TodoListUI = (props) => {
  const { inputValue, list, handleInput, addItem, enterAdd, deleteItem } = props
  return (
    <div style={{ marginTop: "10px", marginLeft: "10px" }}>
      <Input
        style={{ width: "300px", marginRight: "10px" }}
        value={inputValue}
        onChange={handleInput}
        onKeyUp={enterAdd}
      />
      <Button type="primary" onClick={addItem}>
        提交
      </Button>
      <List
        style={{ width: "300px", marginTop: "10px" }}
        bordered
        dataSource={list}
        renderItem={(item, index) => {
          return <List.Item onClick={() => deleteItem(index)}>{item}</List.Item>
        }}
      />
    </div>
  )
}

export default TodoListUI
