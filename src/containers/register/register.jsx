
import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',  // username
    password: '',  // password
    password2: '',  // confirm pwd
    type: 'laoban',  // user type
  }

  // reg
  register = () => {
    //console.log(this.state)
    this.props.register(this.state)
  }

  
  handleChange = (name, val) => {
    // update state
    this.setState({
      [name]: val  
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar>Job Seek</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem placeholder='Please input username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Please input password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Please confirm password' type="password" onChange={val => {this.handleChange('password2', val)}}>Confirm<br></br>Password:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>User Type:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==='dashen'} onChange={() => this.handleChange('type', 'dashen')}>Jobseeker</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'}  onClick={() => this.handleChange('type', 'laoban')}>Boss</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>Register</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>Already have account?</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)