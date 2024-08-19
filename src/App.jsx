import Header from "./Components/Header";
import MealItem from "./Components/MealItem";
import {CartCotextProvider} from "./store/CartContext";
import { ProgressContextProvider } from "./store/ProgressContext";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <ProgressContextProvider>
    <CartCotextProvider>
   <Header ></Header>
   <MealItem></MealItem>
   <Cart></Cart>
   <Checkout></Checkout>

    </CartCotextProvider>
    <Toaster position="bottom-center"reverseOrder={true}/>
    </ProgressContextProvider>
    
  );
}

export default App;
