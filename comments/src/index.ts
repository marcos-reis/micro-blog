import express from 'express'
import {json} from 'body-parser'
import {randomUUID} from 'crypto'
import axios from 'axios'
import cors, { CorsOptions } from 'cors'

const app = express()

type CommentType = {
    id:string
    content:string
    postId:string
}

const comments:CommentType[] = []

const corsOptions:CorsOptions = {
    origin:process.env.SERVER_ALLOW_ORIGIN || ""
}

app.use(json())
app.use(cors(corsOptions))

const eventBusServiceUrl = process.env.EVENT_BUS_SERVICE_URL || ""

app.post("/posts/:id/comments",(req, res)=>{
    const { content } = req.body
    const postId = req.params.id
    const id = randomUUID()

    comments.push({ id, content, postId })

    axios.post(`${eventBusServiceUrl}/events`, {
        type:"CommentCreated",
        data:{ id, content, postId }
    })
    .then(_=>console.log("Event CommentCreated sent successfully"))
    .catch(_=>console.log("Error sending event to EventBus"))    

    res.status(201).send()
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})