import Modal from "./Modal"
import { useContext } from "react"
import CartContext from "../store/CartContext"
import Button from "./Button"
import ProgressContext from '../store/ProgressContext'
import CartItem from "./CartItem"
import { currancyFormatter } from "../utl/currencyFormatter"

export default function Cart(){

    const cartCtx = useContext(CartContext)

    const progressCtx = useContext(ProgressContext)

    const cartTotal = cartCtx.items.reduce((totalPrice,item)=>{
       return totalPrice + item.quantity*item.price
    },0)


    function handleCloseCart(){
        progressCtx.hideCart();
    }

    function handleCheckout(){
        progressCtx.showCheckout();

    }

    let noCartItem ;
    if(cartCtx.items.length===0){
        noCartItem =<h3>There Are No Item in Your Cart !</h3>
    }
    
return(<>
<Modal className="cart" onClose={progressCtx.progress==='cart' ? handleCloseCart : null} open={progressCtx.progress==='cart'}>
    <h2>Your Cart</h2>
        {noCartItem}
    <ul>
        {cartCtx.items.map(item=><CartItem key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        onIncrease={()=>cartCtx.addItem(item)} 
        onDecrease={()=>cartCtx.removeItem(item.id)}
        ></CartItem>)}
    </ul>
    <p className="cart-total">{currancyFormatter.format(cartTotal)}</p>
    <p className="modal-actions">
        <Button textOnly={true} onClick={handleCloseCart}>Close</Button>
       { cartCtx.items.length >0 && <Button onClick={handleCheckout}>Go to Checkout</Button> }

    </p>


</Modal>
</>)

}