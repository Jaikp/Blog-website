import { useParams } from "react-router-dom";
import { useBlog } from "../Hooks";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";

export default function Blog() {
    const {id} = useParams();
    const {loading, Blog} = useBlog({id : id || "9a616445-884c-48f7-b141-b928878b47e2"});

    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    }
  return (
    <div>
        <Appbar name ={Blog?.author.name || " "}/>
        <FullBlog Blog = {Blog || {id: "", title : "", content: "",author : { name : ""}}}/>
    </div>
  )
}
