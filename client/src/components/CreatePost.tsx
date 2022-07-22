import axios from "axios";
import { useState } from "react"

 type ComponentType = {
       setPostAdded: React.Dispatch<React.SetStateAction<boolean>>
 }

export const CreatePost = ({setPostAdded}:ComponentType) =>{
    const [title, setTitle] = useState("");

    const onSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await axios.post("http://blog.com/posts/create",{
            title
        })
         setPostAdded(response.status===201)
    }

    return (
    <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label 
                className="form-label" 
                htmlFor="title"
            >Title</label>
            <input id="title" value={title} onChange={ e => setTitle(e.target.value) } className="form-control"  name="title" type="text" />
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
    </form>
    )
}