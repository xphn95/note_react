import React, { Component } from 'react'
import './style.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: ['学英语', '学前端']
    }
  }
  changeValue(e) {
    // console.log(e.target.value)
    // react 为每个组件都提供修改状态的方法
    // 修改状态要调用这个方法来修改, 不要通过引用的方式修改
    // this.state.inputValue = e.target.value
    this.setState({
      inputValue: e.target.value
    })
  }
  addList(e) {
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
    // console.log(this.state.list)
  }
  removeItem(index, e) {
    // console.log(index, item, e.target)
    const list = [...this.state.list]
    list.splice(index, 1)
    this.setState({
      list
    })
  }
  render() { 
    return (
      <>
        <div>
          <label htmlFor="input">输入</label>
          <input type="text" value={this.state.inputValue} onChange={this.changeValue.bind(this)} className="input" id="input"/>
          <button onClick={this.addList.bind(this)}>提交</button>
        </div>
        <ul>
          {
            this.state.list.map((item, index) => {
              return <li
                key={index}
                onClick={this.removeItem.bind(this, index)}
              >{item}</li>
            })
          }
        </ul>
        {/* <div dangerouslySetInnerHTML={{__html: '<h2>hello</h2>'}}></div> */}
      </>
    )
  }
}

export default TodoList
