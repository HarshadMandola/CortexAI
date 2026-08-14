import { createSlice } from "@reduxjs/toolkit";

const conversationSlice=createSlice({
    name:"conversations",
    initialState:{
        conversations:[],
        selectedConversation:null
    },
    reducers:{
        setConversation:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload)
        },
        setSelectedConversation:(state,action)=>{
            state.selectedConversation=action.payload
        },
        updateConversationTitle: (state, action) => {
            const { conversationId, title } = action.payload;

            const conversation = state.conversations.find(
                conv => conv._id === conversationId
            );

            if (conversation) {
                conversation.title = title;
            }

            if (
                state.selectedConversation?._id === conversationId
            ) {
                state.selectedConversation.title = title;
            }
        }

    }
})

export const {setConversation,addConversation,setSelectedConversation,updateConversationTitle}=conversationSlice.actions
export default conversationSlice.reducer