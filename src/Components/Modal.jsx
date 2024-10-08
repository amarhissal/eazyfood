import { createPortal } from "react-dom";
import { useRef ,useEffect } from "react";
export default function Modal({children,open,className='',onClose}){

    const dialog =useRef()

    useEffect(()=>{
        if(open){
            dialog.current.showModal();
        }

        return ()=>{
            dialog.current.close()
        }
    },[open])


    return createPortal(
    <dialog  className={`modal ${className}`} ref={dialog} onClose={onClose}>{children}</dialog>,document.getElementById('modal'));

}