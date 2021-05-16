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
  /* componentWillMount() {
    console.log("ch will mount")
  }
  componentDidMount() {
    console.log("ch did mount")
  }
  componentWillReceiveProps() {
    console.log("ch will receive")
  }
  componentWillUpdate() {
    console.log("ch will update")
  }
  componentDidUpdate() {
    console.log("ch did update")
  }
  componentWillUnmount() {
    console.log("ch will unmount")
  } */
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState)
    if (nextProps.content !== this.props.content) {
      return true
    }
    return false
  }
  render() {
    console.log("ch render")
    const { content } = this.props
    return <li onClick={this.removeItem}>{content}</li>
  }
}

Item.propTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
}

export default Item
