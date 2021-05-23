import React from 'react'
import { connect } from 'react-redux'
import { getInputItemInfoAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

const TodoList = (props) => {
  const { inputValue, list, handleInput, addItem, enterAdd, deleteItem } = props
  const ulBorder = list.length ? '1px solid #000' : 'none'
  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInput} style={{width: '300px', boxSizing: 'border-box', marginRight: '10px'}} onKeyUp={enterAdd} />
      <button onClick={addItem}>提交</button>
      <ul style={{listStyle: 'none', padding: 0, border: ulBorder, width: '300px', margin: '10px 0 0'}}>
        {
          list.map((item, index) => {
            return <li key={index} style={{border: '1px solid #000'}} onClick={() => deleteItem(index)}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    inputValue: store.inputValue,
    list: store.list
  }
}

const mapDispatchToProps = (dispatch) => {
  const methods = {
    handleInput({target: {value}}) {
      const action = getInputItemInfoAction(value)
      dispatch(action)
    },
    addItem() {
      const action = getAddItemAction()
      dispatch(action)
    },
    enterAdd({keyCode}) {
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
