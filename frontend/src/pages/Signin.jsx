
import { useState } from "react"

import {API_BASE_URL} from "../config"
import  BottomWarning  from "../components/BottomWarning"
import  Button  from "../components/Button"
import  HeaderComponent  from "../components/HeaderComponent"
import  InputBox  from "../components/InputBox"
import  Subheading  from "../components/Subheading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
 const Signin = () => {
  const nav = useNavigate()
  const depend = true
const [Username,setUsername] = useState("");
const [Password,setPassword] = useState("");

// if (depend){
//    nav("/dashboard")
// }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <HeaderComponent label={"Sign in"} />
        <Subheading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
              setUsername(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
        <Button onClick={async()=>{
            const response = await axios.post(`${API_BASE_URL}/api/v1/User/signin`,
            //   "username":"hello3@gmail.com",
            //   "password":"12345678"  joJOS@gmail.com
            //   }
            
               
              {
                username:Username,
              password:Password }
                
          )
            .then(response => {
              console.log(response.data);
              localStorage.setItem("token",response.data.token)
              nav("/dashboard")
            })
            .catch(error => {
              console.error('Error:', error);
            });
            
            
          } } label={"Sign in"} />
        </div>

        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Signin