import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessages } from "../config/memory.js"

export const agent=async (req ,res )=>{
    try {
        const {prompt,conversationId}=req.body

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"user",content:prompt
        })

        const result=await graph.invoke({
            prompt,
            conversationId
        })
        const response=result.aiResponse
        console.log(response)

        await addMessages(conversationId,"user",prompt)

        await addMessages(conversationId,"assistant",response)

        await axios.post(`${process.env.CHAT_SERVICE}/save-message`,{
            conversationId,role:"assistant",content:response,
            images:result.images,
            artifact:result.artifact
        })

        return res.status(200).json({answer:response,images:result.images,artifact:result.artifact})


    } catch (error) {
        console.log(`agent controller  ${error}`)
        return res.status(500).json({message:`agent error${error}`})
    }
}
