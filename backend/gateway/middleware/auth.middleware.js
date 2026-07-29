import redis from "../../shared/redis/redis.js"

const protect=async(req,res,next) => {
    try {
        const sessionId=req.cookies?.session
        if(!sessionId){
            res.status(400).json({message:"unauthorized access  please login"})
        }
        const session=await redis.get(`session-${sessionId}`)
        if(!session){
            res.status(500).json({message:"session expired"})
        }
        req.user=JSON.parse(session)
        next()
    } catch (error) {
        res.status(500).json({message:`protect error ${error}`})
    }
}

export default protect