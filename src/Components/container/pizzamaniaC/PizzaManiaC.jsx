import React,{useContext, useEffect, useState} from 'react'
import PizzaManiaP from '../../presentational/pizzamaniaP/PizzaManiaP'
import { CartContext } from '../cartC/CartProvider'

/*
Operator Precedence (from highest to lowest):
Parentheses ( ):

Operations inside parentheses are evaluated first.
Exponents:

In languages like JavaScript, Python, etc., exponentiation is done using **.
Example: 2 ** 3 evaluates to 8.
Logical NOT ( ! ):

The logical NOT operator negates a boolean value.
Example: !true evaluates to false.
Multiplicative Operators:

Includes multiplication (*), division (/), and modulus (%).
Example: 2 * 3 / 2 evaluates to 3.
Additive Operators:

Includes addition (+) and subtraction (-).
Example: 5 + 3 - 2 evaluates to 6.
Comparison Operators:

Includes ==, !=, <, >, <=, >=.
Example: 3 > 2 evaluates to true.
Logical AND ( && ):

Evaluates logical expressions with AND.
Example: true && false evaluates to false.
Logical OR ( || ):

Evaluates logical expressions with OR.
Example: true || false evaluates to true.
Additional Notes:
Associativity:
Left-associative: Operators like +, -, *, / are evaluated left-to-right.
Right-associative: Operators like ** (exponentiation) are evaluated right-to-left.
This is the general precedence order followed in many programming languages!

*/


function PizzaManiaC() {


  const {addToCart, incrementCart, decrementCart, fetchPizza }=useContext(CartContext)
//use State hook to initialize the array of data from the backend 

const [pizza,setPizza]=  useState([])

const [error,setError] =useState('')

//use Effect hook to fetch the data from the fetchPizza method from the CartContext and this hoook
// renders when ever the fetchPizza gets initialzed 


  useEffect(()=>{

    try{
      
      
      const loadPizzaData= async ()=>{

      const response=await fetchPizza('veg');
      console.log(response,':response')

      if(!response.ok){
        console.log(response.status)
      
        //throw new Error('response not ok',response.status)
      }

setPizza(response);
console.log(pizza,':pizza')
 }


loadPizzaData();
} catch(error){
  
   setError(error)
}
  },[fetchPizza])//dependency array to run the effect when ever the array changes






  if(!addToCart||!incrementCart||!decrementCart||!fetchPizza){

    console.log('cartContext is not set properlty ')
  }

  const missingContext = [addToCart, incrementCart, decrementCart, fetchPizza].some(fn => !fn);

  if (missingContext) {
    console.log('cartContext is not set properly');
  }
  



    
  return (
    <div>PizzaManiaC
{error?(<h1>Error fetching the data</h1>):(<PizzaManiaP
pizzaData={pizza}
addToCart={addToCart}
incrementCart={incrementCart}
decrementCart={decrementCart}
></PizzaManiaP>)}
    </div>
  )
}

export default PizzaManiaC
