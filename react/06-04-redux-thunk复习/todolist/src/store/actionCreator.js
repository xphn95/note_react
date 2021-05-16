import axios from 'axios'
import { INPUT_ITEM_INFO, ADD_LIST_ITEM, REMOVE_LIST_ITEM, INIT_LIST_ITEM } from './actionTypes'

export const getInputItemAction = (value) => ({
  type: INPUT_ITEM_INFO,
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
  type: INIT_LIST_ITEM,
  data
})

export const getListData = () => {
  return (dispatch) => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        const list = []
        res.data.slice(0, 5).map(({title}) => {
          list.push(title)
          return true
        })
        const action = getInitListAction(list)
        dispatch(action)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
