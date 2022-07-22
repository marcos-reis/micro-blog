import axios from "axios";
import {  useCallback, useEffect, useState } from "react"
import { CreateComment } from "./CreateComment";

type ComponentType = {
    setListUpdated: React.Dispatch<React.SetStateAction<boolean>>
    listPostAltered: boolean
}

export const ListPost = ({listPostAltered, setListUpdated}:ComponentType) => {
 console.log(process.env)
    type PostType = {
        id:string
        title:string
        comments:[]
    }

    type CommentType = {
        id:string
        content:string
    }
    
    type PostResponseType ={
        [key:string]:PostType
    }

     const [posts, setPosts] = useState<PostType[]>([])

     const fetchData = useCallback(async()=>{
        const response = await axios.get<PostResponseType>(`${process.env.REACT_APP_API_URL||""}/posts`)
              setPosts(Object.values(response.data))
              setListUpdated(false)
     },[setPosts, setListUpdated])

    useEffect(()=>{
            fetchData()        
    },[listPostAltered, fetchData])

   
    return (
        <div className="mb-3">
              {posts.map((post:PostType)=>(
                <>
                    <p key={post.id}>{post.title}</p>
                    <ul>
                        {post.comments.map((comment:CommentType)=>(
                            <li key={comment.id}>{comment.content}</li>
                        ))}
                    </ul>
                    <CreateComment postId={post.id} 
                    setCommentAdded={setListUpdated}
                    />
                </>
             ))}  
        </div>
    )
}