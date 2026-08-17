import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import messageReducer from "./messageSlice.js"
import conversationReducer from './conversationSlice.js'
import artifactReducer from './artifactSlice.js'
export default configureStore({
  reducer: {
    user:userReducer,
    conversations:conversationReducer,
    message:messageReducer,
    artifact:artifactReducer
  },
})
