import { useEffect } from 'react'
import ChatNavbar from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages } from '../features/getMessages'
import { setMessages } from '../redux/messageSlice'
import { setArtifact } from '../redux/artifactSlice'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

function CharArea() {
  const {selectedConversation}=useSelector(state=>state.conversations)
  const dispatch=useDispatch()
  useEffect(()=>{
      const getMsg=async()=>{
        if(!selectedConversation || selectedConversation.title=="New Chat") {
          dispatch(setMessages([]))
          dispatch(setArtifact(null))
          return
        }

        const data=await getMessages(selectedConversation._id)
        dispatch(setMessages(data))
        const latestArtifact=[...data].reverse().find((message)=>message.artifact?.code)?.artifact
        dispatch(setArtifact(latestArtifact || null))
      }
      getMsg()
  },[dispatch, selectedConversation])
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#212121]">
      <ChatNavbar/>
      <MessageList/>
      <ChatInput/>

    </div>
  )
}

export default CharArea
