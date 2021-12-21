
import io from 'socket.io-client'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from '../api'

/*
1. if user not exists, create
2. save user
 */

function initIO(dispatch, userid) {
  // 1. if obj exists
  if(!io.socket) {
    // connect server
    io.socket = io('ws://localhost:4000')  // 2. save obj
    
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('receive message', chatMsg)
      
      if(userid===chatMsg.from || userid===chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })

  }
}

// get msg list data
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0) {
    const {users, chatMsgs} = result.data
    
    dispatch(receiveMsgList({users, chatMsgs, userid}))
  }
}

// send msg
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    console.log('send message', {from, to, content})
    // send message
    io.socket.emit('sendMsg', {from, to, content})
  }
}

// read msg
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if(result.code===0) {
      const count = result.data
      dispatch(msgRead({count, from, to}))
    }
  }
}


// auth success
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// error message
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// receive user
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
// reset user
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// receive user
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
// receive msg list
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})
// receive msg
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
// read msg
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

// reg async action
export const register = (user) => {
  const {username, password, password2, type} = user
  // form validation
  if(!username) {
    return errorMsg('Username must be entered!')
  } else if(password!==password2) {
    return errorMsg('Passwords are different!')
  }

  return async dispatch => {


    // send reg ajax request

    const response = await reqRegister({username, password, type})
    const result = response.data //  {code: 0/1, data: user, msg: ''}
    if(result.code===0) {
      getMsgList(dispatch, result.data._id)
      
      dispatch(authSuccess(result.data))
    } else { 
      
      dispatch(errorMsg(result.msg))
    }
  }
}

// login action
export const login = (user) => {

  const {username, password} = user
  // form validation
  if(!username) {
    return errorMsg('Username must be entered!')
  } else if(!password) {
    return errorMsg('Password must be entered!')
  }

  return async dispatch => {
    // send login ajax req
  
    const response = await reqLogin(user)
    const result = response.data
    if(result.code===0) {
      getMsgList(dispatch, result.data._id)
      
      dispatch(authSuccess(result.data))
    } else { 
      dispatch(errorMsg(result.msg))
    }
  }
}

// update user action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { 
      dispatch(receiveUser(result.data))
    } else { 
      dispatch(resetUser(result.msg))
    }
  }
}

// get user action
export const getUser = () => {
  return async dispatch => {
    
    const response = await reqUser()
    const result = response.data
    if(result.code===0) { 
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else { 
      dispatch(resetUser(result.msg))
    }
  }
}

// get user list action
export const getUserList = (type) => {
  return async dispatch => {
    
    const response = await reqUserList(type)
    const result = response.data
    
    if(result.code===0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

