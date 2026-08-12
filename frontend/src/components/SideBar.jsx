import React from 'react'
import { Coins, LogOut, MessagesSquare, PanelLeftIcon, PenBoxIcon, Plus, User } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getConversations } from '../features/getConversations'
import { addConversation, setConversation, setSelectedConversation } from '../redux/conversationSlice'
import { createConversation } from '../features/createConversation'
import { getCurrentUser } from '../features/getCurrentUser'
import logOut from '../features/logOut'
import { setUserData } from '../redux/userSlice'
function SideBar() {
  const [collapse,setCollapse]=useState(false)
  const dispatch=useDispatch()
  const {conversations,selectedConversation}=useSelector(state=>state.conversations)
  const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
    const loadUser=async()=>{
      const user=await getCurrentUser()
      if(user){
        dispatch(setUserData(user))
      }
    }
    loadUser()
    const getConv=async()=>{
      const data=await getConversations()
      
      if (!data) return
      dispatch(setConversation(data))
      if (data.length > 0) {
        dispatch(setSelectedConversation(data[0]))
      }
    }
    getConv()
  },[userData?._id])

  const handleConversation=async()=>{
    const data=await createConversation()
    if (!data) return
    dispatch(addConversation(data))
    dispatch(setSelectedConversation(data))
  }
  return (
  <div
    className={`${
      collapse ? "w-20" : "w-72"
    } h-full shrink-0 bg-[#171717] text-white flex flex-col justify-between transition-all duration-300 border-r border-gray-800`}
  >
    {/* Top */}
    <div>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={() => setCollapse(!collapse)}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <PanelLeftIcon size={20} />
        </button>

        {!collapse && (
          <span className="font-bold text-lg tracking-wide">
            CortexAI
          </span>
        )}

        {!collapse && (
          <button
            onClick={handleConversation}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
          >
            <PenBoxIcon size={20} />
          </button>
        )}
      </div>

      {/* New Chat */}
      {!collapse && (
        <div className="p-4">
          <button
            onClick={handleConversation}
            className="w-full flex items-center gap-3 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </div>
      )}

      {/* Recent */}
      <div className="px-3">
        {!collapse && (
          <h3 className="text-xs uppercase text-gray-400 mb-3 px-2">
            Recent
          </h3>
        )}

        {conversations.length === 0 ? (
          !collapse && (
            <p className="text-gray-500 text-sm px-2">
              No Recent Conversations
            </p>
          )
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => {
              const isActive =
                selectedConversation?._id === conv?._id;

              return (
                <button
                  key={conv?._id}
                  onClick={() =>
                    dispatch(setSelectedConversation(conv))
                  }
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition text-left ${
                    isActive
                      ? "bg-gray-700"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <MessagesSquare size={18} />

                  {!collapse && (
                    <span className="truncate text-sm">
                      {conv?.title || "New Chat"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-gray-800 p-4">
      {userData ? (
        <div className="flex items-center gap-3">
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={20} />
            </div>
          )}

          {!collapse && (
            <>
              <div className="flex-1">
                <p className="font-medium truncate">
                  {userData?.name}
                </p>
              </div>

              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <Coins size={18} />
              </button>

              <button
                onClick={() => {
                  logOut();
                  dispatch(setUserData(null));
                }}
                className="p-2 hover:bg-red-600 rounded-lg transition"
              >
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>
      ) : (
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition">
          Login
        </button>
      )}
    </div>
  </div>
);
}

export default SideBar
