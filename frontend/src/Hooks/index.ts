import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";


export interface Blog { 
    title : string;
    content : string;
    id : string;
    author : {
        name : string;
    }
}
export default function useBlogs() {

    const [loading, setloading] = useState(true)
    const [Blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
      
      const getBlogs = async ()=> {
        const response = await axios.get(`${BACKEND_URL}/blog/bulk`,{
          headers : {
            Authorization : localStorage.getItem("token")
          }
        });
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
        setloading(false);
      }
      getBlogs()
    },[])


  return {
    loading,
    Blogs
  }
}

export function useBlog({id }: {id : string}) {

    const [loading, setloading] = useState(true)
    const [Blog, setBlog] = useState<Blog>()

    useEffect(() => {
      
      const getBlog = async ()=> {
        const response = await axios.get(`${BACKEND_URL}/blog/post/${id}`,{
          headers : {
            Authorization : localStorage.getItem("token")
          }
        });
        console.log(response.data.blog);
        setBlog(response.data.blog);
        setloading(false);
      }
      getBlog()
    },[id])


  return {
    loading,
    Blog
  }
}

