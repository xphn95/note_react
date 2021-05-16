import React, { Component } from "react"
import PropTypes from "prop-types"

class Item extends Component {
  constructor(props) {
    super(props)
    this.removeItem = this.removeItem.bind(this)
  }
  removeItem() {
    const { deleteItem, index } = this.props
    deleteItem(index)
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content !== this.props.content) {
      return true
    }
    return false
  }
  render() {
    console.log("ch update")
    const { removeItem } = this
    const { content } = this.props
    return <li onClick={removeItem}>{content}</li>
  }
}

Item.propTypes = {
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  content: PropTypes.string,
}

export default Item
