import React from 'react'

const PizzaItem=({name,description,price,onOrderClick})=>{

return( <div className='pizzaitem'>
    <h3>{name}</h3>
    <p>{description}</p>
    <p>{price}</p>
    <button onClick={onOrderClick}></button>
</div>
   )
}



export default  PizzaItem;
