import React, { useEffect, useState,useContext } from 'react'
import NewLaunchesP from '../../presentational/newlaunchesP/NewLaunchesP'
import { newLaunchContext } from '../../newlaunchContext/NewLaunchContext';


function NewLaunchesC() {

  
const  {fetchNewLaunch}= useContext( newLaunchContext);


const [pizza,setPizza]= useState([])

useEffect(()=>{


  const fetchData=async ()=>{
     try{
      const pdata= await  fetchNewLaunch('new_launches')        
      setPizza(pdata);

      console.log(pizza)
            
     } catch(e){

               console.log(e)
     }

    }

    fetchData();

},[fetchNewLaunch])



  return (
    <div>     
<NewLaunchesP 
pizza={pizza}
></NewLaunchesP>
    </div>
  )
}

export default NewLaunchesC
