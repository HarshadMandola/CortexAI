import { createSlice } from "@reduxjs/toolkit";

const artifactSlice=createSlice({
    name:"artifact",
    initialState:{
        current:null
    },
    reducers:{
        setArtifact:(state,action)=>{
            state.current=action.payload
        },
        clearArtifact:(state)=>{
            state.current=null
        }
    }
})

export const {setArtifact,clearArtifact}=artifactSlice.actions
export default artifactSlice.reducer
