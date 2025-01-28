import React,{useState} from 'react';
import PizzaCustomizationForm from '../../presentational/pizzacustomizationform/pizzacustomization';


const CustomizePizzaContainer=()=>{

    const [customization,setCustomization]=useState({
toppings:[],
size:'Medium',
crust:'Thin Crust'
    })

    const updateCustomization=(key,value)=>{

        setCustomization(prev=>({...prev,[key]:value}))
    };

const handleSumbit=(e)=>{
    e.preventDefault();
console.log('Pizza customized:',customization);
}
return(
<PizzaCustomizationForm
customization={customization}
updateCustomization={updateCustomization}
onSubmit={handleSumbit}
>
</PizzaCustomizationForm>
)
}
export default CustomizePizzaContainer;
