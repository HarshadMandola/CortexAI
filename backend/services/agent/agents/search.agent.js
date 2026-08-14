import { searchtool } from "../config/tavily.js"

export const searchAgent= async(state)=>{
    try {
        const result=await searchtool.invoke({
            query:state.prompt

        })
        console.log(result)
        return {
            ...state,
            searchResults:result ,
            images:result.images
        }
    } catch (error) {
        console.log(error)
        return {
            
            ...state,
            searchResults:[] ,
            images:[]
        
        }
    }
}