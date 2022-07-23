import { useState } from "react";
import { CreatePost, ListPost } from "./components";

const App = () => {
  const [postAdded, setPostAdded]=useState<boolean>(false)
  return (
    <div className="container">
      
          <h2>Create Posts</h2>
          <CreatePost 
           setPostAdded={setPostAdded}
          />
          <hr />
          <h2>List Posts</h2>
          <ListPost 
           setListUpdated={setPostAdded} listPostAltered={postAdded}
          />    
    </div>
  );
}

export default App;
