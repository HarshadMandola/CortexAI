import {  getModel } from "../config/llmModel.js"
const extractJson=(value)=>{
    const cleaned=value.trim().replace(/^```json\s*/i,"").replace(/```$/i,"")
    return JSON.parse(cleaned)
}

export const codingAgent=async(state)=>{
    try {
        const llm=await getModel("coding")
        const response=await llm.invoke(`You are CortexAI's senior software engineer. Return only valid JSON with this exact shape:
{
  "answer":"A concise Markdown explanation of the solution.",
  "artifact": {
    "title":"A descriptive filename or title",
    "language":"The programming language",
    "code":"The complete primary code snippet"
  }
}
Always include an artifact when the user asks for code, debugging, a component, a script, or an API. If code is not appropriate, set artifact to null.

User query:${state.prompt}

`)

        const result=extractJson(response.content)
        console.log(`cdoing ${result}`)
        return {
            ...state,
            aiResponse:result.answer || "I prepared a coding response.",
            artifact:result.artifact?.code ? result.artifact : null
        }
    } catch (error) {
        console.error("coding agent error",error)
        return {
            ...state,
            aiResponse:"I couldn't complete the coding request right now. Please verify that the DeepSeek API key is configured and try again.",
            artifact:null
        }
    }
}
