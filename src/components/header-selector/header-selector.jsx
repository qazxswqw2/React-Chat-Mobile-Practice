/*
user avatar
 */

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null //icon obj
  }

  constructor(props) {
    super(props)
    // get avatar list
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: 'Avatar'+(i+1),
        icon: require(`../../assets/images/Avatar${i+1}.png`) 
      })
    }
  }

  handleClick = ({text, icon}) => {
   
    this.setState({icon})
    // upadte parent component
    this.props.setHeader(text)
  }

  render () {
    // header interface
    const {icon} = this.state
    const listHeader = !icon ? 'Please choose avatar' : (
      <div>
        Selected avatar:<img src={icon}/>
      </div>
    )

    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}