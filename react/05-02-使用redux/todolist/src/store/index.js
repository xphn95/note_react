import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(
  reducer,
  // 有这句就可以使用浏览器插件调试了
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
