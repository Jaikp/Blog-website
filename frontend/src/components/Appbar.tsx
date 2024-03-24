import { Link } from "react-router-dom";

export default function Appbar({name} : {name : string | null}) {
  return (
    <div className="border-b flex justify-between px-10 py-3">
        <Link to={"/blogs"}>
        <div className="flex flex-col justify-center font-bold text-2xl">
            Medium
        </div>
        </Link>
        <div className="flex flex-col justify-center">
            <div className="flex">
                <Link to={"/publish"}>
                    <button type="button" className="mb-0 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button>
                </Link>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="text-2xl text-gray-600 dark:text-gray-300">{name? name[0] : 'A'}</span> 
                </div>
                <div className="flex flex-col justify-center ml-2">
                    {name}
                </div>
                
            </div>
        </div>
    </div>
  )
}
