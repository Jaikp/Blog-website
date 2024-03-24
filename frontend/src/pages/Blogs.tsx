
import { Link } from "react-router-dom";
import useBlogs from "../Hooks";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";


export default function Blogs() {

  const {loading , Blogs} = useBlogs();

  if(loading){
    return <div>
      loading
    </div>
  }
  const name1 = localStorage.getItem("name");

  return (

    <div>
      <Appbar name = {name1}/>
      <div className="text-center font-bold text-4xl mt-3">
        Blogs
        
            </div>
              {Blogs.map(blog=>
              <Link to={`/blog/${blog.id}`}>
                <BlogCard 
                key={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"March 20, 2024"}

                />
            </Link>
            )}
          </div>
       
  )
}
