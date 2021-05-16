import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({/* 这个参数一定要是个对象, 哪怕是个空对象也要传 */}) : compose

const enhancer = composeEnhancers(
  // 使用展开运算符把中间件组成的数组打散
  applyMiddleware(...[thunk]),
)

const store = createStore(
  reducer,
  enhancer
)

export default store
