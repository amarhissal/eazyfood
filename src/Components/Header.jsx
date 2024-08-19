import headerImage from '../assets/logo.jpg'
import Button from './Button'
import { useContext } from "react";
import CartContext from "../store/CartContext";
import ProgressContext from '../store/ProgressContext'
export default function Header(){

    const cartctx= useContext(CartContext)
    const progressCtx =useContext(ProgressContext)

    function handleShowCart(){
        progressCtx.showCart()
    }

    const totalCartItem = cartctx.items.reduce((totalNumberofCarItems,item)=>{
       return totalNumberofCarItems+item.quantity;
    },0)

    return(<>
     <header id='main-header'> 
      <div id="title">
       <img  src={headerImage}/> 
      <h1>EAZYFOOD</h1>
    </div>
    <nav>
    <Button onClick={handleShowCart} >Cart({totalCartItem})</Button>
    </nav>
    </header>
    </>)
}