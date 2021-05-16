import { INPUT_LIST_ITEM, ADD_TODO_ITEM, REMOVE_LIST_ITEM } from './actionTypes'

export const getInputChangeAction = (value) => ({
  type: INPUT_LIST_ITEM,
  value
})

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getRemoveItemAction = (index) => ({
  type: REMOVE_LIST_ITEM,
  index
})
