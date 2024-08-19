import Modal from "./Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Input from "./Input";
import Button from "./Button";
import ProgressContext from '../store/ProgressContext'
import { currancyFormatter } from "../utl/currencyFormatter";
import useHttp from "../Hooks/useHttp";
import Error from "./Error";

const reqConfig = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }}

export default function Checkout(){
    const cartCtx = useContext(CartContext)
    const progressCtx = useContext(ProgressContext)

    const{data,isLoading,error,sendRequest,clearData}=useHttp('https://backend-eazyfood.onrender.com/orders',reqConfig)



    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>{
        return totalPrice + item.quantity*item.price
     },0)

     function handleCloseCheckout(){
        progressCtx.hidecheckout()
     }

     function handleSubmit(event){
        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())

        sendRequest( JSON.stringify({
                        order: {
                            items: cartCtx.items,
                            customer: customerData
                        }
                    }));
        
     }

     function finishCheckOut(){
        progressCtx.hidecheckout()
        cartCtx.clearCart()
        clearData();
     }

     let actions = (<>
      <Button onClick={handleCloseCheckout} textOnly={true}>Close</Button>
                <Button >Submit Order</Button></>)


        if(isLoading){
            actions = <p>Sending...</p>
        }




        if(data &&  !error){
            return(  <Modal open={progressCtx.progress==='checkout'} onClose={ progressCtx.progress==='checkout' ? handleCloseCheckout : null}>
                    <h2>Success!</h2>
                    <p>Your Order Submitted Succefully..</p>
                    <p>We will Get Back to you soon...</p>
                    <p className="modal-actions">
                        <Button onClick={finishCheckOut}>Close</Button>
                    </p>
                     </Modal>)
        }
            
    return(<>
    <Modal open={progressCtx.progress==='checkout'} onClose={ progressCtx.progress==='checkout' ? handleCloseCheckout : null}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount : {currancyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" id='name' type='text'></Input>
            <Input label="Email Address" id='email' type='email'></Input>
            <Input label="Street" id='street' type='text'></Input>
            <div className="control-row">
                <Input label='Postal Code' type='text' id='postal-code'></Input>
                <Input label='City' type='text' id='city'></Input>
            </div>
            {error && <Error title='Failed to Submit Order' message={error}></Error>}
            <span className="modal-actions">{actions}   </span>
        </form>

    </Modal>
    </>)
}