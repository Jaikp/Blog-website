import { Blog } from "../Hooks"
import { Avatar } from "./BlogCard"


export default function FullBlog({Blog} : {Blog : Blog}) {
  return (
    <div className="grid grid-cols-3">
        <div className="col-start-1 col-end-3 h-screen">
            <div className="p-5">
                <div className="ml-28 mt-28">
                    <div className="font-bold text-6xl">
                        {Blog.title}
                    </div>
                    <div className="font-light mt-3 mb-3">
                        Posted on March 20, 2024
                    </div>
                    <div className="text-lg">
                        {Blog.content}
                    </div>
                </div>
            </div>
        </div>
        <div className="col-start-3 h-screen ">
            <div className="p-5">
            <div className="mt-28 ml-7">
                    <div className="font-semibold text-xl">
                        Author
                    </div>
                    <div className="font-light mt-5 mb-3 flex">
                        <div className="flex flex-col justify-center">
                            <Avatar name={Blog.author.name}/>
                        </div>
                        <div className="flex flex-col justify-center ml-3">
                            {Blog.author.name}
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
