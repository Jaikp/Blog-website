import Auth from "../components/Auth";
import Quote from "../components/Quote";


export default function Signup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="">
            <Auth type={"Sign Up"}/>
        </div>
        <div className="invisible md:visible">
        <Quote/>
        </div>
            

    </div>
  )
}
