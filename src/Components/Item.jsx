import Button from "./Button"
import { useContext } from "react";
import { currancyFormatter } from "../utl/currencyFormatter"
import CartContext from "../store/CartContext";
import toast from "react-hot-toast";


export default function Item({mealItems}){

    const cartctx= useContext(CartContext)

    function handleAddItem(item){
    toast.success("Item Added Successfully to Cart");
        cartctx.addItem(item)

    }
    return(<>
     {mealItems.map(item=><li className="meal-item" key={item.id}> 
                <article>
                <img src={`https://backend-eazyfood.onrender.com/${item.image}`} alt={item.name}/>
                <div > 
                <h3>{item.name}</h3>
            <p className="meal-item-price">{currancyFormatter.format(item.price)}</p>
            <p  className="description">{item.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={()=>handleAddItem(item)}>Add Cart</Button>
            </p>
        
            </article>

            </li>)}
    </>)
}