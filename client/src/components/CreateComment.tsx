import axios from "axios";
import { useState } from "react"

 type ComponentType = {
        setCommentAdded: React.Dispatch<React.SetStateAction<boolean>>
        postId:string
 }

export const CreateComment = ({setCommentAdded, postId}:ComponentType) =>{
    const [content, setContent] = useState("");

    const onSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await axios.post(`${process.env.REACT_APP_API_URL||""}/posts/${postId}/comments`,{
            content
        })
          setCommentAdded(response.status===201)
    }

    return (
    <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label 
                className="form-label" 
                htmlFor="content"
            >Content</label>
            <input id="content" value={content} onChange={ e => setContent(e.target.value) } className="form-control"  name="content" type="text" />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
    </form>
    )
}