export default function Error({label},{isError}){

return(
<>
<div className={`mt-4 p-4 rounded ${isError ? ' bg-red-100 text-red-500 border border-red-500' : ' bg-green-100 text-green-500 border border-green-500'}`}>
        
        {label}
    </div>
</>)
}