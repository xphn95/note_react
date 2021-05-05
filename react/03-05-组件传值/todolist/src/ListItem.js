import React, { Component } from "react"

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.deleteItem(this.props.index)
  }
  render() {
    return <li onClick={this.handleClick}>{this.props.content}</li>
  }
}

export default ListItem
