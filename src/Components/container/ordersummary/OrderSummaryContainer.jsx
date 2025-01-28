import React,{useState} from 'react';
import OrderSummary from '../../presentational/ordersummary/OrderSummary';


const  OrderSummaryContainer=()=>{

      console.log("Hello from OrderSummaryConatiner")
const [orderItems,setOrderItems]=useState([
        { id: 1, name: 'Margherita', quantity: 1 },
        { id: 2, name: 'Pepperoni', quantity: 2 }
      ]);
    
      const handleCheckout=()=>{
//handle  Checkout logic
console.log('Checked out with items:',orderItems);
      }

      return (
<>  <OrderSummary orderItems={orderItems} onCheckOut={handleCheckout}></OrderSummary>
</>

      ) 
}
export default  OrderSummaryContainer;
