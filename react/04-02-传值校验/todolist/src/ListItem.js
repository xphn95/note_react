import React, { Component } from "react"
import PropTypes from "prop-types"

class ListItem extends Component {
  constructor(props) {
    super(props)
    this.removeItem = this.removeItem.bind(this)
  }
  removeItem() {
    const { deleteItem, index } = this.props
    deleteItem(index)
  }
  render() {
    const { content, test } = this.props
    return (
      <li onClick={this.removeItem}>
        {test}-{content}
      </li>
    )
  }
}

ListItem.propTypes = {
  // isRequired 必传
  test: PropTypes.string.isRequired,
  // 指定范围的某种类型
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  content: PropTypes.string,
}

// 有了默认值, 即使没有传这个值也不会报警告了
ListItem.defaultProps = {
  test: "hello world",
}

export default ListItem
