import express from 'express'
import {json} from 'body-parser'
const app = express()
type CommentType = { id:string, content:string}

type PostType = { id:string, title:string, comments:CommentType[]}
const postsWithComments:PostType[]=[{
    id:"1", title:"test",comments:[{id:"1",content:"teste 2"}]
}]

app.use(json())

app.get("/posts",(req,res) => {
    res.send(postsWithComments)
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})