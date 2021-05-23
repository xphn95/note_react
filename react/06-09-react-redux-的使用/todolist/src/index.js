import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import TodoList from "./todoList"
import store from "./store"

const App = (
  // react-redux 提供 Provider, 设置 store 属性, 这样 Provider 组件包裹的元素都可以访问 store 的内容
  <Provider store={store}>
    <TodoList />
  </Provider>
)

ReactDOM.render(App, document.getElementById("root"))
