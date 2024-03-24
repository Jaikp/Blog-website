import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface Blog{
    title : string;
    content : string;
    published : boolean;
}

export default function Publish() {
    const navigate = useNavigate();
    const [PostBlog, setPostBlog] = useState<Blog>({
        title : "",
        content : "",
        published : true
    })

    async function handleClick(){
        try{
            const response = await axios.post(`${BACKEND_URL}/blog/post`,PostBlog,{headers : {
                Authorization : localStorage.getItem("token")
              }});
            navigate(`/blog/${response.data.id}`)
        }catch(e){
            alert("error while posting, try again")
        }
    }
  return (
    <div>
        <Appbar name={"Anonymous"}/>
        <div className="">
            <div className="max-w-3xl ml-10 mt-5 p-2">
                <input onChange={(e)=>{setPostBlog(
                    {...PostBlog,
                     title : e.target.value
                })}} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="text-wrap text-black text-4xl font-bold rounded-lg focus:outline-none active:cursor-text block w-full p-2.5" placeholder="title"/>
            </div>
            <div className="ml-10 mt-3">
                <div className=" p-2 mb-4   rounded-lg  ">
                    <div className=" bg-white rounded-b-lg ">
                        <label  className="sr-only">Publish post</label>
                            <textarea onChange={(e)=>{setPostBlog({...PostBlog, content : e.target.value})}} id="editor"  className="block w-full p-2  text-xl text-gray-800 bg-white border-0 focus:outline-none  " placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
                <button onClick={handleClick} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
           
  </div>
  )
}
