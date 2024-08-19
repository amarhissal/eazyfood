import { createContext ,useState } from "react";
const ProgressContext =createContext({
    prgress:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hidecheckout:()=>{}
})

export function ProgressContextProvider({children}){
    const [progress,setProgress]=useState('')

    function showCart(){
        setProgress('cart')
    }

    function hideCart(){
        setProgress('')
    }

    function showCheckout(){
        setProgress('checkout')
    }

    function hidecheckout(){
        setProgress('')
    }


    const progressCtx = {
        progress:progress,
        showCart,
        hideCart,
        showCheckout,
        hidecheckout
    }

    
    

    return(
        <ProgressContext.Provider value={progressCtx}>{children}</ProgressContext.Provider>
    )
}

export default ProgressContext;