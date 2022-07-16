import express from 'express'
import {json} from 'body-parser'
const app = express()

type CommentType = { id:string, content:string}
type PostType = { id:string, title:string, comments:CommentType[]}

const posts:{[key:string]:PostType}={}

app.use(json())

app.post("/events",(req, res) => {
    const { type, data } = req.body

    if(type === "PostCreated"){
        const {id, title} = data
        posts[id]={ id, title, comments:[] }
    }

    if(type === "CommentCreated"){
        const {id, content, postId} = data
        posts[postId].comments.push({id, content})        
    }
    
    res.send('')
})

app.get("/posts",(req,res) => {
    res.send(posts)
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})