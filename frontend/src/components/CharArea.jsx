import React, { useEffect } from 'react'
import ChatNavbar from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../features/getMessages'
import { setMessages } from '../redux/messageSlice'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

function CharArea() {
  const {selectedConversation}=useSelector(state=>state.conversations)
  const dispatch=useDispatch()
  useEffect(()=>{
      const getMsg=async()=>{
        if(!selectedConversation) return 

        const data=await getMessages(selectedConversation?._id)
        dispatch(setMessages(data))
      }
      getMsg()
  },[selectedConversation])
  return (
    <div>
      <ChatNavbar/>
      <MessageList/>
      <ChatInput/>

    </div>
  )
}

export default CharArea