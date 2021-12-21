import ajax from './ajax'

// register api
export const reqRegister = (user) => ajax('/register', user, 'POST')
// login api
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')
// update user api
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// get user data
export const reqUser = () => ajax('/user')

// get users list
export const reqUserList = (type) => ajax('/userlist', {type})

// get user msgs list
export const reqChatMsgList = () => ajax('/msglist')

// read msg
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')