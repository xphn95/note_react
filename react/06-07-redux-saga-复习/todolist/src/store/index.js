import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import reducer from "./reducer"
import todoSaga from './sagas'

const todoListSaga = createSagaMiddleware()

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(...[todoListSaga])
  // other store enhancers if any
)
const store = createStore(reducer, enhancer)

todoListSaga.run(todoSaga)

export default store
