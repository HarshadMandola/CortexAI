import { getModel } from "../config/llmModel.js"

export const router=async(state)=>{
     const llm=await getModel("router")
     const prompt=`You are an intelligent Agent Router.

Your task is to determine which specialized agent should handle the user's request.

User Prompt: ${state.prompt}

Available agents:

* chat → General conversation, greetings, explanations, brainstorming, opinions, casual questions, summaries, writing assistance, and anything that does not belong to another specialized agent.

* search → Requests requiring internet search, current events, latest information, news, weather, stock prices, recent facts, or information that must be retrieved from external sources.

* coding → Programming, debugging, code generation, code explanation, algorithms, APIs, software architecture, databases, DevOps, system design, and technical troubleshooting.

* pdf → Requests to create, read, extract, summarize, merge, split, analyze, or edit PDF documents.

* ppt → Requests to create, edit, improve, or generate PowerPoint presentations or slide decks.

* vision → Creating, generating, editing, modifying, enhancing, or transforming images, illustrations, logos, diagrams, artwork, memes, posters, avatars, icons, or photos.
Rules:

1. Choose exactly one agent.
2. Return only the agent name.
3. Do not explain your reasoning.
4. Do not output punctuation, markdown, or extra text.
5. If multiple agents could apply, choose the most specialized one.
6. If no specialized agent clearly fits, return "chat".

Valid outputs:
chat
search
coding
pdf
ppt
vision

User Prompt: ${state.prompt}
`
const response=await llm.invoke(prompt) 
console.log(response)
return {
    ...state,
    agent:response.content.trim().toLowerCase()
}
}