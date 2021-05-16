const defaultState = {
  inputValue: '',
  list: []
}

const reducer = (state = defaultState, action) => {
  if (action.type === 'input_list_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  } else if (action.type === 'add_list_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  return state
}

export default reducer
