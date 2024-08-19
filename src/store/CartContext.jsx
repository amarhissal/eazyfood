import { createContext,useReducer } from "react";
 const CartContext = createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{}
})

function cartReducer(state,action){
    if(action.type==='ADD_ITEM'){
        const exidtingCartItemIndex = state.items.findIndex(item=>item.id===action.item.id) 
        const updatedItems =[...state.items]
        if(exidtingCartItemIndex>-1){
            const updatedItem = {
                ...state.items[exidtingCartItemIndex],
                quantity:state.items[exidtingCartItemIndex].quantity +1
            }
            updatedItems[exidtingCartItemIndex]=updatedItem

        }
        else{
            updatedItems.push({...action.item,quantity:1})
        }

        return {...state,items:updatedItems}

    }
     if(action.type==="REMOVE_ITEM"){
        const exidtingCartItemIndex = state.items.findIndex(item=>item.id===action.id) 
        const existingCartItem = state.items[exidtingCartItemIndex]
        const updatedItems = [...state.items]

        if(existingCartItem.quantity===1){
            updatedItems.splice(exidtingCartItemIndex,1)
        }
        else{
            const updatedItem ={
               ...existingCartItem,
               quantity:existingCartItem.quantity-1
            }
            updatedItems[exidtingCartItemIndex]=updatedItem
        }
        return {...state,items:updatedItems}



    }

    if(action.type==='CLEAR_CART'){
        return{...state,items:[]}
    }
    return state;

}




export  function CartCotextProvider({children}){

   const[cart,dispatchCartAction]= useReducer(cartReducer,{items:[]})

   function addItem(item){
    dispatchCartAction({type:"ADD_ITEM",item})
   }

   function removeItem(id){
    dispatchCartAction({type:"REMOVE_ITEM",id})
   }

   function clearCart(){
    dispatchCartAction({type:"CLEAR_CART"})
   }

   const Cartctx = {
    items : cart.items,
    addItem,
    removeItem,
    clearCart
   }


   
   


    return(<CartContext.Provider value={Cartctx}>{children}</CartContext.Provider>)
}

export default CartContext;