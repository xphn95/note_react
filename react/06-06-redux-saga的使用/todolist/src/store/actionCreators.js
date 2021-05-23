// import axios from 'axios'
import { INPUT_ITEM_INFO, ADD_LIST_ITEM, REMOVE_LIST_ITEM, INIT_LIST_DATA, SAGA_INIT_LIST } from './actionTypes'

export const getInputItemAction = (value) => ({
  type: INPUT_ITEM_INFO,
  value
})

export const getAddItemAction = () => ({
  type: ADD_LIST_ITEM
})


export const getRemoveItemAction = (index) => ({
  type: REMOVE_LIST_ITEM,
  index
})

export const getData = (data) => ({
  type: INIT_LIST_DATA,
  data
})

/* export const getInitListDataAction = () => {
  return (dispatch) => {
    axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then(({data}) => {
      const list = []
      data.slice(0, 5).map(item => {
        list.push(item.title)
        return true
      })
      const action = getData(list)
      dispatch(action)
    })
    .catch(err => {
      console.log(err)
    })
  }
} */

export const getSagaInitListAction = () => ({
  type: SAGA_INIT_LIST
})
