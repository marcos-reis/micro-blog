import express from 'express'
import {json} from 'body-parser'
import axios from 'axios'

const app = express()

app.use(json())

app.post("/events",(req,res)=>{
    const { type, data } = req.body

    const postsServiceUrl = process.env.POSTS_SERVICE_URL || ''
    const commentsServiceUrl = process.env.COMMENTS_SERVICE_URL || ''
    const queryServiceUrl = process.env.QUERY_SERVICE_URL || ''

    axios.post(`${postsServiceUrl}/events`, { type, data }).catch(error=>error.message)
    axios.post(`${commentsServiceUrl}/events`, { type, data }).catch(error=>error.message)
    axios.post(`${queryServiceUrl}/events`, { type, data }).catch(error=>error.message)

    res.send('')
})

const port = process.env.SERVER_PORT
app.listen(port,() =>{
    console.log(`Server started on port ${port}!`)
})