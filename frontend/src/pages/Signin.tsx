import Auth from "../components/Auth"
import Quote from "../components/Quote"


export default function Signin() {
  return (
    <div className="grid grid-cols-2">

      <div className="">
        <Auth type={"Signin"}/>
      </div>
      <div className="invisible md:visible">
        <Quote/>
      </div>

    </div>
  )
}
