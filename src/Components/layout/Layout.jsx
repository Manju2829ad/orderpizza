import React, { useEffect } from 'react';
import NavBarC from '../container/navbarcontainer/NavBarC';
import { Outlet,useLocation, useSearchParams } from 'react-router-dom';
import HeaderC from '../container/headerC/HeaderC';
import RecommendedC from '../container/recommended/RecommendedC';


// function Layout() {

//   const location =useLocation();
//   const  hideHeaderAndNavRoutes=['/profile']

//   return (
//     <div>
// {!hideHeaderAndNavRoutes.includes(location.pathname)
//         &&<>   <HeaderC></HeaderC>
//                 <NavBarC /> 
                
//                 <RecommendedC></RecommendedC>
//                  </>
                
// }
//       <main>
//         {/* Renders the matched route's content */}
//         <Outlet  />
//       </main>
//     </div>
//   );
// }


function Layout(){

    const currentLocation= useLocation();

    const  recommended =['/','/recommended'];

    // const [showRecommended,setShowRecommended] =useState(true);



    // useEffect(()=>{

      
    // })



    const    hideHeaderandNavRoutes= ['/profile','/login','/SignUp']

  return (
    <div>    
    {!hideHeaderandNavRoutes.includes(currentLocation.pathname)&&
       <>
       <HeaderC></HeaderC>
       <NavBarC></NavBarC>
       </>
    }

          {recommended.includes(currentLocation.pathname) && <>
            <RecommendedC></RecommendedC>

          </>}
          
        
    
    <main>
      <Outlet></Outlet>
    </main>
    </div>
  )
  }



export default Layout;
