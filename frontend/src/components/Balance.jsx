 import { useState } from "react";
import { useEffect } from "react";
 const Balance = () => {
    
const [value,setValue] = useState(0)
    useEffect(()=>{async()=>{
        const resposne=  await axios.get("http://localhost:3000/api/v1/account/Balance",{
            "userId": "66786dc4c4574fa7ccae3e8c"
            })
            .then(resposne=> console.log(resposne))
          
        }},[])

//    const call =  async()=>{
//     try{
//             const resposne=  await axios.get("http://localhost:3000/api/v1/account/Balance",{
//                 "userId": "66786dc4c4574fa7ccae3e8c"
//                 })

            
//             }
//             catch(e){
//                 console.log("error")
//             }
//             }
//             call()
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}
export default Balance