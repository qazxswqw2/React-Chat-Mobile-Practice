/*
main
 */

import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'

class Main extends Component {

  navList = [ // Nav array
    {
      path: '/laoban', 
      component: Laoban,
      title: 'Jobseekers',
      icon: 'dashen',
      text: 'JobSeeker',
    },
    {
      path: '/dashen', 
      component: Dashen,
      title: 'Bosses',
      icon: 'laoban',
      text: 'Bosses',
    },
    {
      path: '/message', 
      component: Message,
      title: 'Messages',
      icon: 'message',
      text: 'Message',
    },
    {
      path: '/personal', 
      component: Personal,
      title: 'Dashboard',
      icon: 'personal',
      text: 'Dashboard',
    }
  ]

  componentDidMount () {
    //login cookie check
    const userid = Cookies.get('userid')
    const {_id} = this.props.user
    if(userid && !_id) {
      // get user
      this.props.getUser()
    }
  }

  render() {

    // get userid from cookie
    const userid = Cookies.get('userid')
    // if no user, redirect
    if(!userid) {
      return <Redirect to='/login'/>
    }
    // if yes, get user data from redux
    const {user, unReadCount} = this.props
    if(!user._id) {
      return null
    } else {
      
      let path = this.props.location.pathname
      if(path==='/') {
       
        path = getRedirectTo(user.type, user.header)
        return <Redirect to= {path}/>
      }
    }

    const {navList} = this
    const path = this.props.location.pathname 
    const currentNav = navList.find(nav=> nav.path===path) // get current nav

    if(currentNav) {
      // hide route
      if(user.type==='laoban') {
        // hide second
        navList[1].hide = true
      } else {
        // hide first
        navList[0].hide = true
      }
    }

    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
          }
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/dasheninfo' component={DashenInfo}/>
          <Route path='/chat/:userid' component={Chat}/>

          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),
  {getUser}
)(Main)

