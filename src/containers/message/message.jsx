
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief
/*
Group chatMsgs by chat_id, and get an array of lastMsg of each group
1. Find out the lastMsg of each chat, and use an object container to store {chat_id, lastMsg}
2. Get the array of all lastMsg
3. Sort the array (descending order by create_time)
 */
function getLastMsgs(chatMsgs, userid) {
  // 1. Find out the lastMsg of each chat, and use an object container to store {chat_id, lastMsg}
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {

    
    if(msg.to===userid && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    // get msg id
    const chatId = msg.chat_id
    // get last msg
    let lastMsg = lastMsgObjs[chatId]
    // if no
    if(!lastMsg) { 
      lastMsgObjs[chatId] = msg
    } else {
     
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      
      if(msg.create_time>lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      //update unread msg count
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })

  // 2. get all lastmsgs
  const lastMsgs = Object.values(lastMsgObjs)

  // 3. sort array
  lastMsgs.sort(function (m1, m2) { 
    return m2.create_time-m1.create_time
  })
  console.log(lastMsgs)
  return lastMsgs
}

class Message extends Component {

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // group chatmsgs by id
    const lastMsgs = getLastMsgs(chatMsgs, user._id)


    return (
      <List style={{marginTop:50, marginBottom: 50}}>

        {
          lastMsgs.map(msg =>{
            // get user id
            const targetUserId = msg.to===user._id ? msg.from : msg.to
            // get user info
            const targetUser = users[targetUserId]
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)