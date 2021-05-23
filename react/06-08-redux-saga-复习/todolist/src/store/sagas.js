import axios from "axios"
import { takeEvery, put } from "redux-saga/effects"
import { INIT_LIST_DATA } from "./actionTypes"
import { getDataAction } from "./actionCreators"

function* getTodoData() {
  const { data } = yield axios.get("https://jsonplaceholder.typicode.com/todos")
  const list = []
  data.slice(0, 5).map(({ title }) => {
    list.push(title)
    return true
  })
  const action = getDataAction(list)
  yield put(action)
}

function* todoSaga() {
  yield takeEvery(INIT_LIST_DATA, getTodoData)
}

export default todoSaga
