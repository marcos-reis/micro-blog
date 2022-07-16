import express from 'express'
import {json} from 'body-parser'
import {randomUUID} from 'crypto'
import axios from 'axios'


const app = express()

type CommentType = {
    id:string
    content:string
    postId:string
}

const comments:CommentType[] = []

app.use(json())

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

    res.send('')
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})