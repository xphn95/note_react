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