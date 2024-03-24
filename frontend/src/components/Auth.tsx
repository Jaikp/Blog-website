
import { SignupInput } from "@jaikp/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Auth({type} : {type : "Sign Up" | "Signin"}) {
    const navigate = useNavigate();
    const [PostInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        email : " ",
        password : " "
    })

    async function postrequest(){
        try{
            console.log("hellow");
            const response = await axios.post(`${BACKEND_URL}/user/${type === "Sign Up"? "signup" : "signin "}`,PostInputs);
            const jwt = "Bearer "+ response.data.token;
            localStorage.setItem("token",jwt);
            localStorage.setItem("name1", response.data.name);
            navigate("/blogs");
        }catch(e){
            alert("error in post request");
        }
        
    }


  return (
    <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div className="w-96">
                <div className="text-3xl font-bold text-center">
                    {type === "Sign Up" ? "Create an account" : "Login"}
                </div>
                <div className="text-md font-light text-center">
                    {type === "Sign Up"? "Already an account?" : "Don't have an account?"}
                    <Link className="pl-2 underline" to={type==="Sign Up" ? "/Signin" : "/Signup"}>{type==="Sign Up" ? "Login" : "Sign Up"}</Link>
                </div>
                {type==="Sign Up"?   <LabelledInput label={"username"} placeholder={"Enter you username"} onChange={(e)=>{
                    setPostInputs({
                        ...PostInputs,
                        name : e.target.value
                    });
                }}/> : ""}
                <LabelledInput label={"email"} placeholder={"abcd@example.com"} onChange={(e)=>{
                    setPostInputs({
                        ...PostInputs,
                        email : e.target.value
                    })
                }}/>
                <LabelledInput type={"password"} label={"password"} placeholder={""} onChange={(e)=>{
                    setPostInputs({
                        ...PostInputs,
                        password : e.target.value
                    })
                }}/>
                <div>
                    <button className="mt-4 rounded-md p-2 font-medium bg-black text-white border w-full" onClick={postrequest}>{type}</button>
                </div>
            </div>
        </div>
    </div>
  )
}
interface LabelledInputType {
    label : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}
function LabelledInput({type,label,placeholder , onChange} : LabelledInputType){

    return(
        <>
    <div className="text-lg font-medium mt-5 mb-2">
        {label}
    </div>
    <div>
        <input type={type || "text"} onChange={onChange} className="p-2 rounded-md font-light border w-full" placeholder={placeholder}></input>
    </div>
    </>)
}


