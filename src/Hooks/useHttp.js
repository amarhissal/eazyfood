import { useState ,useEffect,useCallback} from "react";

async function sendHttp(url,config) {
    const response = await fetch(url,config)
    const resData = await response.json();
    if(!response.ok){
        throw new Error(resData.message || "Something failed while sending request")
    }

    return resData;
}

export default function useHttp(url,config,inititalData){
    const [error,setError]=useState('');
    const[data,setData]=useState(inititalData)
    const[isLoading,setIstLoading]=useState(false);

    function clearData(){
        setData(inititalData)
    }

    

   const sendRequest=useCallback(async function sendRequest(data){
        setIstLoading(true)
        try{
            const resData = await sendHttp(url,{...config,body:data});
            setData(resData)

        }
        catch(error){
            setError(error.message||'Something wenr Wrong!')
        }
        setIstLoading(false)
    },[url,config])

    useEffect(()=>{
        if(config && (config.method==='GET'|| !config.method)){
            sendRequest();
        }
    },[sendRequest,config])

    return{
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}