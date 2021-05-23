## 创建项目

### 使用 create-react-app 

```shell
npx create-react-app 项目文件夹名称
```

### 运行

```shell
cd 项目文件夹
yarn start
```

### 熟悉文件结构

> 1. `public/manifast.json` 是为 PWA (主要优点: 可离线使用)准备的.
> 2. 使用 JSX 语法就要引用 react 不然无法编译.
> 3. ReactDOM 是用来挂载组件的.

## 通过编写 todolist 了解 react 的写法 

### 注意事项

> - 每个组件都是一个类, 这个类继承自 React.Component
> - 类的 constructor 接受一个参数 props, 因为继承的关系, 要调用 super 并传入 props
> - constructor 中定义状态(也就是数据)
> - render 函数返回 JSX 语法编写的组件 html , 状态直接在 JSX 中赋值, 注意 JSX 中的 js 要用 {} 包裹. 事件的方法也要使用`bind(this)`来绑定 this 的指向, 不然 this 会丢失.
> - 修改状态的自定义函数调用 react 为每个组件都提供的 setState 方法来修改状态中的属性即可. 自定义的函数接收一个 event 参数, event.target 是事件绑定的 DOM 节点.



## jsx 进阶

### 转义

dangerouslySetInnerHTML 属性可以不转义标签(相当于 vue 的 v-html), 用法

```jsx
<div dangerouslySetInnerHTML={{__html: '<h2>hello</h2>'}}></div>
```

这样显示的不是字符串 ‘<h2>hello</h2>’ , 是二级标题.



### 标签属性名变换(避免和html冲突)

class –> className

for(<label>) –> htmlFor



## 父组件传值

父组件传值传方法都是通过属性传递的, 子组件通过 `this.props.绑定的属性名` 来获取

传方法一般都是想让子组件使用这个方法来操作修改父组件的状态, 一定要注意 this 的指向一定要是父组件.



## 组件类的 constructor 里面的一些特定内容

1. 传入参数 props
2. 调用 super(props)
3. 绑定事件方法的 this 指向
4. 指定组件状态
5. 第3, 4条的内容如果都没有不要写这个 constructor .

## setState 的新写法

之前 setState 接收的对象参数, 现在的写法是用函数来返回这个对象, 并传参数 prevState , 这个参数代替 this.state. 注意 e.target.value 要放在函数体外面.

```js
handleInput(e) {
  // 新react的setState不希望接收对象了
  // 改为接收一个函数来返回对象
  /* this.setState({
    inputValue: e.target.value,
  }) */
  const inputValue = e.target.value
  this.setState(() => ({
    inputValue,
  }))
}

addItem() {
  /* this.setState({
    list,
    inputValue: "",
  }) */
  this.setState((prevState) => ({
    list: [...prevState.list, prevState.inputValue],
    inputValue: "",
  }))
}
```



## 传值类型校验和传值默认值

### 导入

```js
import PropTypes from 'prop-types'
```

### 类型校验

```js
ListItem.propTypes = {
  // isRequired 必传
  test: PropTypes.string.isRequired,
  // 指定范围的某种类型
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  content: PropTypes.string,
}
```

### 给必须的值设置默认值保底

```js
// 有了默认值, 即使没有传这个值也不会报警告了
ListItem.defaultProps = {
  test: "hello world",
}
```

## props, state 和 render 函数的关系

**当组件的 props , state 发生改变时, render 函数就会重新执行**



**页面初始化的时候, render 函数就会先执行一次.**



**父组件的 render 函数重新执行时, 它的子组件的 render 函数都将被重新执行一次.**



## 虚拟 DOM

> 如果我们自己来实现 react 做的事情应该是什么样的步骤呢?
>
> 1. state 数据
> 2. JSX 模板
> 3. 数据 + 模板 结合, 生成真实的 DOM , 来显示.
> 4. state 发生改变
> 5. 数据 + 模板 结合, 生成真实的 DOM, 替换原始的 DOM.
>
> 这个过程的缺陷:
>
> - 生成了 2 次真实的 DOM, 并且第二次生成的 DOM 整段替换第一次的, 非常耗性能.
>
> 改进: 
>
> 1. state 数据
> 2. JSX 模板
> 3. 数据 + 模板 结合, 生成真实的 DOM , 来显示.
> 4. state 发生改变
> 5. 数据 + 模板 结合, 生成真实的 DOM, 不着急替换原始的 DOM.
> 6. 新的 DOM (DocumentFragment) 和原始的 DOM 比对, 找出差异
> 7. 替换差异的部分.
>
> 这种方式的缺陷:
>
> - DOM 替换节约了性能, 两次生成的 DOM 对比又消耗了性能.
>
> react 的方式:
>
> 1. state 数据
> 2. JSX 模板
> 3. 数据 + 模板 生成虚拟 DOM .(用来描述真实 DOM 的 js 对象)
> 4. 根据虚拟 DOM 生成真实的 DOM , 来显示.
> 5. state 发生改变
> 6. 生成新的虚拟 DOM.
> 7. 比较虚拟 DOM 的区别
> 8. 渲染真实 DOM .
>
> 这样做性能节省在哪里?
>
> - 减少真实 DOM 的创建和真实 DOM 的对比
>
> 虚拟 DOM 的优点: 
>
> - 性能提升了.
> - 使得跨端应用得以实现, 因为如果没有虚拟 DOM 那就是直接渲染真实 DOM 了, 而 DOM 只是浏览器才有.

## 认识 diff 算法

diff 算法是对比虚拟 DOM 用到的算法, 每当调用 setState 就会引起虚拟 DOM 对比, 但是 setState 是异步的, 极短时间内的多次不同会一起对比之后统一修改真实 DOM. diff 算法是同级比较, 指定 key 就更方便对比了, 注意 key 不要使用 index 等会改变的值效果和没指定 key 一样.



## ref 的使用及 setState 的第二个参数

标签元素可以使用 ref 属性获取当前元素的 DOM , ref 属性指定一个函数, 函数参数是给当前元素起的名称, 函数体是把这个名称绑定到类上. 



```js
addItem() {
  this.setState(
    (prevState) => {
      return {
        list: [...prevState.list, prevState.inputValue],
        inputValue: "",
      }
    },
    () => {
      console.log(this.ul.querySelectorAll("li").length)
    }
  )
  // console.log(this.ul.querySelectorAll("li").length) // 此时打印的 Item 数量总是上一次的状态, 因为 setState 是异步的, 解决办法是使用 setState 的第二个参数, 这个参数是更新 state 后的回调函数.
}
```



## 生命周期

### 认识生命周期函数(16.x)

componentWillReceiveProps(组件将接收传值): 这个生命周期函数仅限`有父组件传值且父组件的render重新执行`才会执行.

shouldComponentUpdate: 这个生命周期函数需要有返回值, 返回 true 或 false 来决定是否更新组件.

componentWillUnmount: 子组件将被移除之前执行, 在父组件的 render 之后 componentDidUpdate 之前执行.



子组件的生命周期函数是在父组件的 render 之后执行, 然后才是父组件的 DidMount 或 DidUpdate.







<img src="https://i.loli.net/2021/05/08/e8UJf1zic5rl3qo.png" alt="生命周期.png" style="zoom:200%;" />





### 使用 shouldComponentUpdate 函数阻止子组件不必要的重新渲染

这个函数有2个参数

- nextProps: 新的传值
- nextState: 新的状态

### 发送 ajax 请求

发请求放在 DIdMount 阶段.



## react 动画效果

### css 的过渡和动画

利用 css 的过渡(transition) 和动画(animation) 来写效果, 通过 js 来控制组件的类名.(这个地方有个知识点就是animation的fill-mode属性)



### react-transition-group

### 安装

```shell
yarn add react-transition-group
```

### 引入

```js
import { CSSTransition, TransitionGroup } from 'react-transition-group'
```

### 使用

#### 单个组件

```js
render() {
  const { toggle } = this
  const { show } = this.state
  return (
    <>
      <CSSTransition
        // 监视控制过渡的状态
        in={show}
        // 过渡效果的执行时间
        timeout={1000}
        // 类名标识
        classNames="fade"
        // 入场动画执行完的钩子函数
        onEntered={(el) => {
          el.style.color = "red"
        }}
        appear={true}
      >
        <div>hello</div>
      </CSSTransition>
      <button onClick={toggle}>toggle</button>
    </>
  )
}
```

#### 一组组件

```js
render() {
  const { addItem } = this
  const { list } = this.state
  return (
    <>
      <TransitionGroup>
        {
          list.map((item, index) => {
            return (
              <CSSTransition timeout={1000} classNames='fade' onEntered={ el => el.style.color = 'red' } appear={true} key={index}>
                <div >{item}</div>
              </CSSTransition>
            )
          })
        }
      </TransitionGroup>
      <button onClick={addItem}>添加</button>
    </>
  );
}
```



## redux

### 流程



![redux.png](https://i.loli.net/2021/05/11/BKt9RzO1lgLwTPX.png)



### 使用redux步骤

1. 在 src 目录下新建 store 文件夹, 里面包含 `index.js` 和 `reducer.js`.

`index.js`

```js
import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(
  reducer,
  // 有这句就可以使用浏览器插件调试了
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
```

`reducer.js`

```js
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

```

2. 组件初始化阶段(constructor)中使用 store.getState() 获取存储的状态赋值给 state .
3. 事件触发状态变化, 并传给 store , store 会自动传给 reducer

```js
/* 
  当输入时触发事件, 让 store 修改状态
  这一步修改的效果是贯穿到 reducer 的, store 自动把状态反馈给reducer
  reducer 来做判断是否采用新的状态, 并且返回新的状态, 新状态不是老状态的原地修改, 而是拷贝.
*/
handleInput(e) {
  // 声明一个对象通知 store 更新状态
  const action = {
    // 必须, 将要执行的动作
    type: "change_input_value",
    value: e.target.value,
  }
  store.dispatch(action)
}
```

4. reducer 处理新状态并返回新状态

```js
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
```

5. 组件要订阅一个向 store 获取新状态的方法.

```js
componentDidMount() {
  // 订阅 store 获取新状态
  // 这个过程要放在挂载完成后, 因为这个方法使用了 setState
  // setState 可以在即将接收组件传值, 挂载完毕, 更新完毕, 事件等时候使用, 其他时候使用是禁止或无意义的
  store.subscribe(this.handleStoreChange)
}
handleStoreChange() {
  // console.log('store change')
  this.setState(store.getState())
}
```



### 知识点复习补充

- store 是唯一的.
- store 的内容只能 store 自己改变. reducer 只是存储了初始的 state , 如果有 state 的更新 store 就通知 reducer 处理, 判断, 再生成新的state 并返回 store. store 仍然是 state 的管理者. 组件也是从 store 获得 state.
- reducer 一定是纯函数. ps: 纯函数就是`给定固定的输入就一定有固定的输出且不产生任何副作用`.(一般与时间有关或包含异步请求的就不是纯函数) 副作用就是对其他相关值有修改.

## UI 组件和容器组件的拆分

容器组件只负责业务逻辑, 就是方法和状态

UI组件只负责渲染



## 无状态组件

### 概念

当一个普通组件只有 render 函数的时候就可以不用写成类的样子而用函数的形式写成无状态组件(上面的UI组件可以写成无状态组件)





### 优势

无状态组件就是一个普通函数, 它不是一个继承 react 的类, 也就没有生命周期函数等复杂的概念, 效率高的多.



## 在 redux 中获取异步数据

### 安装 redux-thunk

```shell
yarn add redux-thunk
```

`src/store/index.js`

```js
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(...[thunk]),
)

const store = createStore(
  reducer,
  enhancer
)

export default store

```

### 编写异步请求的 action 

之前的 action 返回的都是带有 type 属性和其他参数属性的`对象`, 现在使用了 redux-thunk 这个 redux 中间件后, action 可以返回函数了, 函数体是我们的异步请求.

组件通过在 ComponentDidMount 中创建 action(这个 action 本质是一个函数, 上一段说了) 并且 store.dispatch(store) 派发(这个和同步是一样的), 异步就是组件调用本质是方法的这个 action , 它的函数体处理异步请求并调用另一个 action (普通的 action , 本质是包含 type 等属性的对象).

```js
const getInitListAction = (data) => ({
  type: INIT_LIST_ITEM,
  data
})

export const getListData = () => {
  return (dispatch) => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        const list = []
        res.data.slice(0, 5).map(({title}) => {
          list.push(title)
          return true
        })
        const action = getInitListAction(list)
        dispatch(action)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
```

## 什么是 redux 中间件

redux 中间件就是对 dispatch 的封装, dispatch 是介于 action 和 store 之间的, 在不使用中间件时, action 只能是对象, dispatch 把 action 对象直接传递给 reducer, 而使用中间件时, action 还可以是一个方法, dispatch 会判断 action 是对象还是方法, 如果是对象就直接传递, 如果是方法就把这个方法给执行了再把对象形式的 action 传递给 reducer. 我觉得就是在 action 中写回调函数, redux-thunk 是上面的做法(异步的逻辑写在 action 中), 接下来学习的 redux-saga 是把异步的逻辑拆分到单独的文件中.



## redux-saga 的使用

### 安装

```sh
yarn add redux-saga
```

### 引入

1. 在 `src/store`目录下创建一个文件

```js
// 基础结构
function* todoSaga() {

}

export default todoSaga
```



2. 在`src/store/index.js`中(需要添加或修改的部分代码)

```js
import createSagaMiddleware from 'redux-saga'

// 导入上面创建的文件
import todoSagas from './sagas'

// 创建实例
const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
  // applyMiddleware(...[thunk]),
  applyMiddleware(...[sagaMiddleware]),
)
const store = createStore(reducer, enhancer)

sagaMiddleware.run(todoSagas)
```

3. 完整的 sagas.js

```js
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

```

## react-redux 的使用

主要了解2个api: provider 和 connect

provider 组件包裹的元素都可以访问 provider 的 store 属性绑定的 store 数据.



```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import TodoList from './todoList'
import store from './store'

const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
)

ReactDOM.render(
  App,
  document.getElementById('root')
)

```

connect是一个连接组件和 store 的函数, 它接收2个参数, 一个是 store 中的数据在组件中state的映射, 另一个是派发的 action 与组件的方法的映射. 自定义的组件在 react-redux 中的角色本质就是一个子组件, 并且状态也抽出来放到 connect 的参数中, 那么它就可以是一个无状态的组件.



```js
import React from 'react'
import { connect } from 'react-redux'
import { getInputItemInfoAction, getAddItemAction, getDeleteItemAction } from './store/actionCreators'

const TodoList = (props) => {
  const { inputValue, list, handleInput, addItem, enterAdd, deleteItem } = props
  const ulBorder = list.length ? '1px solid #000' : 'none'
  return (
    <div>
      <input type="text" 
    		value={inputValue} 
				onChange={handleInput} 
				style={
          {
          	width: '300px', 
          	boxSizing: 'border-box', 
          	marginRight: '10px'
        	}
				} 
       	onKeyUp={enterAdd} />
      <button onClick={addItem}>提交</button>
      <ul 
				style={
          {
          	listStyle: 'none', 
          	padding: 0, 
          	border: ulBorder, 
          	width: '300px', 
          	margin: '10px 0 0'
        	}
				}>
        {
          list.map((item, index) => {
            return <li 
            	key={index} 
            	style={{border: '1px solid #000'}} 
							onClick={() => deleteItem(index)}
            >{item}</li>
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    inputValue: store.inputValue,
    list: store.list
  }
}

const mapDispatchToProps = (dispatch) => {
  const methods = {
    handleInput({target: {value}}) {
      const action = getInputItemInfoAction(value)
      dispatch(action)
    },
    addItem() {
      const action = getAddItemAction()
      dispatch(action)
    },
    enterAdd({keyCode}) {
      keyCode === 13 && methods.addItem()
    },
    deleteItem(index) {
      const action = getDeleteItemAction(index)
      dispatch(action)
    }
  }
  return methods
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

```

