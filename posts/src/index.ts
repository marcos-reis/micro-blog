import express from 'express'
import {json} from 'body-parser'
import {randomUUID} from 'crypto'
const app = express()

type PostType = { id:string, title:string}
const posts:PostType[]=[]

app.use(json())

app.post("/api/posts",(req,res)=>{
    const { title } = req.body
    const post = {
        id:randomUUID(),
        title
    }

    posts.push(post)

    console.log(posts)
    
    res.send('')
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})