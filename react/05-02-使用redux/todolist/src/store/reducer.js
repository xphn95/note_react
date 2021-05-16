const defaultState = {
  inputValue: "",
  list: [],
  data: [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ],
}

// reducer可以接收 state 不能修改 state
const reducer = (state = defaultState, action) => {
  // console.log(state, action)
  if (action.type === "change_input_value") {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  } else if (action.type === 'add_item') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  return state
}
export default reducer
