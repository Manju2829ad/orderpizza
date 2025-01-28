//Function to handle addtocart
export const handleAddtoCart=(setInCart)=>{
    console.log("form handleAddtoCart")
    setInCart(true)
};


//Function to handle incrementing the quantity

export const incrementQunatity=(setQuantity)=>{

    setQuantity(prevQuantity=>prevQuantity+1);
}

//Function to handle Decrementing the quqntiy 
export const decrementQuantity=(setQuantity,quantity)=>{
    if(quantity>1){
        setQuantity(prevQuantity=>prevQuantity-1);
        console.log("from decrement")
    }
}
