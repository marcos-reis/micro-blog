import express from 'express'
import  {json} from 'body-parser'
import {randomUUID} from 'crypto'
const app = express()

type CommentType = { id:string, content:string, postId:string}
const comments:CommentType[]=[]

app.use(json())

app.get("/api/comments",(req, res)=>{
    const { content,postId } = req.body
    const comment:CommentType = {
        id:randomUUID(),
        content,
        postId
    }

    comments.push(comment)

    console.log(comments)
    
    res.send('')
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})