import {
  INPUT_ITEM_INFO,
  ADD_LIST_ITEM,
  DELETE_LIST_ITEM,
  INIT_LIST_DATA,
  INIT_LIST_DATA_SAGA,
} from "./actionTypes"

export const getInputItemInfoAction = (value) => ({
  type: INPUT_ITEM_INFO,
  value,
})

export const getAddListItemAction = () => ({
  type: ADD_LIST_ITEM,
})

export const getDeleteListItemAction = (index) => ({
  type: DELETE_LIST_ITEM,
  index,
})

export const getInitListAction = () => ({
  type: INIT_LIST_DATA,
})

export const getDataAction = (data) => ({
  type: INIT_LIST_DATA_SAGA,
  data,
})
