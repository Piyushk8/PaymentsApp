import { useState } from "react"
import  BottomWarning  from "../components/BottomWarning"
import  Button  from "../components/Button"
import  HeaderComponent  from "../components/HeaderComponent"
import  InputBox  from "../components/InputBox"
import  Subheading  from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Error from "../components/ErrorMessage"
const Signup = () => {
  //states
  const nav = useNavigate()
const [FirstName,setFirstName]=useState('');
const [LastName,setLastName]=useState('');
const [Username,setUsername]=useState('');
const [Password,setPassword]=useState('');
const [message,setMessage] = useState("Not Valid")

const [isError,setIsError] = useState({status:false,error:false})

//component fields
    return <div className="bg-slate-300 h-screen flex justify-center">
     <div className="flex flex-col justify-center">
      
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <HeaderComponent label={"Sign up"} />
        <Subheading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e)=>{
          setFirstName(e.target.value);
          setIsError({...isError,error:false})
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={(e)=>{
          setLastName(e.target.value)
          setIsError({...isError,error:false})
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={(e)=>{
          setUsername(e.target.value)
          setIsError({...isError,error:false})
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
          setIsError({...isError,error:false})
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          
          <Button onClick={async()=>{
            await axios.post(`${API_BASE_URL}/api/v1/User/signup`,
              {
                firstname:FirstName,
                lastname:LastName,
                username:Username,
              password:Password }
                
          )
            .then(response => {
              localStorage.setItem("token",response.data.token)
              console.log(response.data.token);
              nav("/dashboard")
            })
            .catch(error => {
              setIsError({...isError,error:true})
              
              
              console.error('Error:', error);
              
            });
            //! if signup successfull nav("/dashboard")
            
          }} label={"Sign up"} />
        </div>
        <div>{isError.error ? <Error label={message} isError={isError.error} ></Error> : ""}</div>
        
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div> 
    
  </div>
}

export default Signup