import React from 'react';
import "./NewLaunchesP.css";

function NewLaunchesP({ pizza = [] }) {
console.log('fetchnewlaunch..')
  console.log(pizza)
  return (
    <div>

      <div className='Container'>

        {pizza.length===0?(<p>No Data found </p>):( pizza.map((element) => (
           <div className='card' key={element.id}>
             <img src={element.image} />
             <span>{element.name}</span>
             <p>{element.description}</p>
           </div>
         )))}
       
      </div>
    </div>
  );
}

export default NewLaunchesP;
