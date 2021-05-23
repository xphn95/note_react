import React from "react"
import { connect } from "react-redux"
import {
  getInputItemAction,
  getAddItemAction,
  getDeleteItemAction,
} from "./store/actionCreators"

const TodoList = (props) => {
  const { inputValue, list, handleInput, addItem, enterAdd, deleteItem } = props
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInput}
        onKeyUp={enterAdd}
      />
      <button onClick={addItem}>提交</button>
      <ul>
        {list.map((item, index) => {
          return (
            <li key={index} onClick={() => deleteItem(index)}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    // 把 store 中的 inputValue 映射到 props 的 inputValue 中
    inputValue: store.inputValue,
    list: store.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  const methods = {
    handleInput({ target: { value } }) {
      const action = getInputItemAction(value)
      dispatch(action)
    },
    addItem() {
      const action = getAddItemAction()
      dispatch(action)
    },
    enterAdd({ keyCode }) {
      keyCode === 13 && methods.addItem()
    },
    deleteItem(index) {
      const action = getDeleteItemAction(index)
      dispatch(action)
    }
  }
  return methods
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
