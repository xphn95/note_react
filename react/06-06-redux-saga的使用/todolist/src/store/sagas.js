import axios from 'axios'
import { takeEvery, put } from 'redux-saga/effects'
import { SAGA_INIT_LIST } from './actionTypes'
import { getData } from './actionCreators'

function* getInitList() {
  /* 
    发送异步请求
    创建 action
    派发 action
  */
  const res = yield axios
    .get('https://jsonplaceholder.typicode.com/todos')
  const list = []
  res.data.slice(0, 5).map(item => {
    list.push(item.title)
    return true
  })
  const action = getData(list)
  yield put(action)
}

function* todoSaga() {
  // 捕获 type , 执行对应的函数
  yield takeEvery(SAGA_INIT_LIST, getInitList)
}

export default todoSaga
