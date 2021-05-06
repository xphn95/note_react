import React, { Component } from "react"

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }
  handleRemove() {
    const { deleteItem, index } = this.props
    deleteItem(index)
  }
  render() {
    const { content } = this.props
    return <li onClick={this.handleRemove}>{content}</li>
  }
}

export default ListItem
