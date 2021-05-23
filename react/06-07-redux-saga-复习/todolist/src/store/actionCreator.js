import { INPUT_ITEM_INFO, ADD_LIST_ITEM, REMOVE_LIST_ITEM, INIT_LIST_DATA, INIT_LIST_DATA_SAGA } from "./actionTypes"

export const getInputItemInfoAction = (value) => ({
  type: INPUT_ITEM_INFO,
  value,
})

export const getAddListItemAction = () => ({
  type: ADD_LIST_ITEM
})

export const getRemoveListItemAction = (index) => ({
  type: REMOVE_LIST_ITEM,
  index
})

export const getData = (data) => ({
  type: INIT_LIST_DATA,
  data
})

export const getInitListDataAction = () => ({
  type: INIT_LIST_DATA_SAGA
})
