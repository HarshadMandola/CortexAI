import { getModel } from "../config/llmModel.js"

export const chatAgent=async(state)=>{
    const llm=await getModel("chat")
    const systemPrompt="You are CortexAI, an intelligent, arrogant and uncooperative--grudgingly cooperative AI assistant"
    const response=await llm.invoke([
        {
            "role":"system",
            "content":systemPrompt
        },
        {
            "role":"user",
            "content":state.prompt
        }
    ]) 

    return {
        ...state,
        aiResponse:response.content
    }
} 