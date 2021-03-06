import express from 'express'
import {json} from 'body-parser'
import {randomUUID} from 'crypto'
import axios from 'axios'

const app = express()

type PostType = { id:string, title:string}
const posts:PostType[]=[]

app.use(json())
const eventBusServiceUrl = process.env.EVENT_BUS_SERVICE_URL || ""
app.post("/posts/create",(req,res)=>{
    const { title } = req.body
    const id = randomUUID()
    const post = {
        id,
        title
    }

    posts.push(post)

    axios.post(`${eventBusServiceUrl}/events`, {
        type:"PostCreated",
        data:{ id, title }
    })
    .then(_=>console.log("Event PostCreated sent successfully"))
    .catch(_=>console.log("Error sending event to EventBus"))    
    res.status(201).send()
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})