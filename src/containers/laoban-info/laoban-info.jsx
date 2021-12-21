/*
Bosses info
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import {updateUser} from '../../redux/actions'

class LaobanInfo extends Component {

  state = {
    header: '',
    post: '',
    info: '',
    company: '',
    salary: '',
  }

  // Update header
  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    
    const {header, type} = this.props.user
    if(header) {
      const path = type==='dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>Boss info is complete</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder='Position' onChange={val => {this.handleChange('post', val)}}>Position:</InputItem>
        <InputItem placeholder='Company' onChange={val => {this.handleChange('company', val)}}>Company<br></br>Name:</InputItem>
        <InputItem placeholder='Salary' onChange={val => {this.handleChange('salary', val)}}>Salary:</InputItem>
        <TextareaItem title="Requirment:"
                      placeholder='Please input position requirment'
                      rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(LaobanInfo)