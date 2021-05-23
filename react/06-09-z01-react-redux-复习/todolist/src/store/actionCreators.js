import { INPUT_ITEM_INFO, ADD_LIST_ITEM, DELETE_LIST_ITEM } from './actionTypes'

export const getInputItemInfoAction = (value) => ({
  type: INPUT_ITEM_INFO,
  value
})

export const getAddItemAction = () => ({
  type: ADD_LIST_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_LIST_ITEM,
  index
})
