import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import { useState } from 'react';
import Error from './ErrorMessage';
import { API_BASE_URL } from '../config';


const SendMoney = () => {
const [searchParams] = useSearchParams();

const id = searchParams.get("id")
const name = searchParams.get("name")
const [amount,setAmount] = useState(0);
const [message,setMessage] = useState("");
const [isError,setIsError] = useState({error:false,status:false});

    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    {/* {id+name} */}
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">A</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input 
                        onChange={(e)=>{
                            setAmount(e.target.value)
                        }}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async()=>{
                        try{
                       const response =  await axios.post(`${API_BASE_URL}/api/v1/account/transfer`,
                        {
                         to:id,
                        amount:amount
                        },
                        {
                            headers:{
                                Authorization:"Bearer "+localStorage.getItem('token')
                                    }
                        }
                        )
                        setMessage(response.data.message)
                        console.log(message)}
                        catch(e){
                            setIsError({...isError ,
                                    error:true
                        });
                        
                            setMessage(e.response.data.message);
                                }
                        finally{
                            setIsError({...isError ,
                                status:true
                        })
                        }
                    }}
                     class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                </div>
                {/* <div className={`mt-4 p-4 rounded ${isError ?   ' bg-green-100 text-green-500 border border-green-500':""}`}>
        
                    {message}
                </div> */}

               { (isError.status) ?<Error isError = {isError} label={message}></Error>:""}
                </div>
        </div>
      </div>
    </div>
}

export default SendMoney