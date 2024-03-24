
interface BlogCardProps {
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
}
export default function BlogCard({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) {
  return (
    <div className="flex justify-center mt-6">
        <div className="p-3 max-w-3xl">
        <div className="flex p-1">

            <div className="flex justify-center flex-col">
            <Avatar name={authorName}/>
            </div>
            <div className="flex justify-center flex-col ml-2 mr-2">
                {authorName}
            </div>
            <div className="flex justify-center flex-col font-bold text-3xl text-slate-600">
                ·
            </div>
            <div className="flex justify-center flex-col font-extralight ml-2 text-slate-800">
                  {publishedDate}
            </div>
               
        </div>
        <div className="font-bold text-3xl mt-2">
            {title}
        </div>
        <div className="font-extralight mt-1 text-lg">
            {content.slice(0,200) + "..."}
        </div>
        <div className="mt-4 font-light">
            {`${Math.ceil(content.length/100)} min read`}
        </div>
        <div className="mt-12 bg-slate-200 h-1 w-full">

        </div>
        </div>
    </div>
  )
}

export function Avatar({name} : {name : string}){
    
    return(

<div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{name? name[0]:"A"}</span> 
</div>

    )
}
