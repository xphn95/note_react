import { INPUT_ITEM_INFO, ADD_LIST_ITEM, REMOVE_LIST_ITEM, INIT_LIST_DATA } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}

const reducer = (state = defaultState, action) => {
  if (action.type === INPUT_ITEM_INFO) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  } else if (action.type === ADD_LIST_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  } else if (action.type === REMOVE_LIST_ITEM) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  } else if (action.type === INIT_LIST_DATA) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data
    return newState
  }
  return state
}

export default reducer
