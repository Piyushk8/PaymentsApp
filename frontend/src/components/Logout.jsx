import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
function Logout() {
    const nav = useNavigate()
    const HandleLogout = async()=>{
        // await axios.post("http://localhost:3000/api/v1/user/logout")
       localStorage.removeItem("token")
        nav("/Signin")
        
    }

  return (
    <>
    <Button label={"Log out"} onClick={HandleLogout}>

    </Button>
    
    </>
  )
}

export default Logout
