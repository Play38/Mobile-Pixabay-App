import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { TouchableOpacity, Image } from 'react-native'

export default class ImageBtn extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.any.isRequired,
    source: PropTypes.node.isRequired,
    onPress: PropTypes.any.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      style: this.props.style,
      source: this.props.source
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress(this.props.source, this.props.id)
        }}
      >
        <Image style={this.props.style} source={{ uri: this.props.source }} />
      </TouchableOpacity>
    )
  }
}
