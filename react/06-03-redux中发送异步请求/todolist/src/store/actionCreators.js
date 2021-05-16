import axios from 'axios'
import { INPUT_LIST_ITEM, ADD_LIST_ITEM, REMOVE_LIST_ITEM, INIT_LIST_DATA } from './actionTypes'

export const getInputInfoAction = (value) => ({
  type: INPUT_LIST_ITEM,
  value
})

export const getAddListItemAction = () => ({
  type: ADD_LIST_ITEM
})

export const getRemoveListItemAction = (index) => ({
  type: REMOVE_LIST_ITEM,
  index
})

const getInitListAction = (data) => ({
  type: INIT_LIST_DATA,
  data
})

// 使用了 redux-thunk 这个中间件
export const getTodoList = () => {
  return (dispatch) => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        const data = []
        res.data.slice(0, 5).map(item => {
          data.push(item.title)
          return true
        })
        const action = getInitListAction(data)
        dispatch(action)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
