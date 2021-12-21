/*
job seeker info
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends Component {

  state = {
    header: '',
    post: '',
    info: '',
  }

  // update header
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
    // debugger
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    // if info is complete back to interface
    const {header, type} = this.props.user
    if(header) { 
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>Jobseeker info is complete</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder='Please input position' onChange={val => {this.handleChange('post', val)}}>Position:</InputItem>
        <TextareaItem title="Description:"
                      placeholder='Please input personal description'
                      rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(DashenInfo)