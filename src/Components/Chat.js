import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import Input from './Input'
import Messages from './Messages'

function Chat() {
  const { data } = useContext(ChatContext)
  return (
    <>
      {data.chatId !== 'null' ? (
        <div className='chat'>
          <div className='chatInfo'>
            <div className='chatUser'>
              {data.chatId !== 'null' && (
                <img src={data.user?.photoURL} alt='' />
              )}
              <span>{data.user?.displayName}</span>
            </div>
            <div className='chatIcons'>
              <i className='fa-solid fa-video'></i>
              <i className='fa-solid fa-user-plus'></i>
              <i className='fa-solid fa-ellipsis'></i>
            </div>
          </div>
          <Messages />
          <Input />
        </div>
      ) : (
        <div className='chat'>
          <div className='chooseChat'>
            <span>Choose a chat to start the conversation</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Chat
