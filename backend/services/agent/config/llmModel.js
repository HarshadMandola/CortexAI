import dotenv from "dotenv"
dotenv.config()

import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { ChatOpenRouter } from "@langchain/openrouter";
import axios from "axios"
import { ChatDeepSeek } from "@langchain/deepseek";
const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: process.env.GROQ_API_KEY,
    // other params...
})


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
    maxRetries: 2,
    // other params...
})



const callDeepSeek = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 1024,
  // other params...
});
    
export const getModel= async(agent)=>{
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;    
        case "coding":
            return callDeepSeek;
        default:
            return groq;
    }
}