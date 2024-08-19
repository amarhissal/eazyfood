import { useState,useEffect, useContext } from "react"
import Item from "./Item";
import Error from "./Error";
import Loader from "./Loader";
import useHttp from "../Hooks/useHttp";


const reqConfig ={}
export default function MealItem(){



    const{data:mealItems,error,isLoading}=useHttp('https://backend-eazyfood.onrender.com/meals',reqConfig,[])

   
    

        if(isLoading){
            return( <Loader></Loader>)
        }

            if(error){
               return( <Error title='Failed to Fetch meals' message={error}></Error>)
            }

    return(<>


        <ul id="meals">
           {!error && <Item mealItems={mealItems}></Item>}
           
        </ul>

    
    </>)
}
