import { useState } from "react"
import  Button  from "./Button"
import { useEffect } from "react";
 
import {useNavigate} from "react-router-dom"
import axios from 'axios'
export const Users = () => {
    // Replace with backend call
    const a = [1,2,3]
    const [filter , setFilter] = useState("")
    const [users, setUsers] = useState([]);
    var message = "";

    const fetchuser = async()=>{
       try{ const response =await  axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem('token')
            }
        })
        setUsers(response.data.users)
        console.log(users)}
        catch(e){
        message = e.response.data.message
        }
 }

    useEffect(()=>{
     
     fetchuser();
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
        {message}
        { users.map((user)=> <div key ={user._id}><User usern = {user} ></User></div>) }
        </div>
    </>
}

 const  User = ({usern})=> {
 const navigate = useNavigate();
    // console.log("entered")
    // console.log(usern)
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="transition-all ease-out duration-5000 delay-5000 flex flex-col justify-center h-full text-xl">
                    {usern.firstName[0]}
                </div>
            </div>
            <div className="transition-all ease-out duration-5000 delay-5000 flex flex-col justify-center h-ful">
                <div key = {usern._id}>
                    {usern.firstName} {usern.lastName}
                </div>
            </div>
        </div>

        <div className="transition-all ease-out duration-5000 delay-5000 flex flex-col justify-center h-ful">
            <Button onClick={(e)=>{
                navigate("/send?id="+usern._id+"&name="+usern.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}

