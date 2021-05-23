import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import { INIT_LIST_DATA_SAGA } from './actionTypes'
import { getData } from './actionCreator'

function* getList() {
  const res = yield axios.get('https://jsonplaceholder.typicode.com/todos')
  const list = []
  res.data.slice(0, 5).map(({title}) => {
    list.push(title)
    return true
  })
  const action = getData(list)
  yield put(action)
}

function* todoSaga() {
  yield takeEvery(INIT_LIST_DATA_SAGA, getList)
}

export default todoSaga
