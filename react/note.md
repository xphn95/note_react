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

