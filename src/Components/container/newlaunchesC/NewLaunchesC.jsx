import React, { useEffect, useState,useContext } from 'react'
import NewLaunchesP from '../../presentational/newlaunchesP/NewLaunchesP'
import { CartContext } from '../cartC/CartProvider';


function NewLaunchesC() {

  
const {addToCart,addToCart2, incrementCart, decrementCart, fetchPizza } =useContext(CartContext);

console.log("addtocart");

console.log(addToCart);

const [pizza,setPizza]= useState([])



useEffect(()=>{
  const fetchData=async ()=>{
     try{
      const pdata= await  fetchPizza('new_launches')  
      
      if(pdata)
      setPizza(pdata);
     
      console.log(pizza)
            
     } catch(e){

               console.log(e)
     }

    }

    fetchData();

},[pizza])



  return (
    <div>     
<NewLaunchesP 
pizza={pizza}

addtoCart={addToCart2}

></NewLaunchesP>
    </div>
  )
}

export default NewLaunchesC
