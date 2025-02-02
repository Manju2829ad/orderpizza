import React from 'react';
import NavBarC from '../container/navbarcontainer/NavBarC';
import { Outlet,useLocation } from 'react-router-dom';
import HeaderC from '../container/headerC/HeaderC';
import RecommendedC from '../container/recommended/RecommendedC';

function Layout() {

  const location =useLocation();
  const  hideHeaderAndNavRoutes=['/profile']

  return (
    <div>
{!hideHeaderAndNavRoutes.includes(location.pathname)
        &&<>   <HeaderC></HeaderC>
                <NavBarC /> 
                
                <RecommendedC></RecommendedC>
                 </>
                
}
      <main>
        {/* Renders the matched route's content */}
        <Outlet  />
      </main>
    </div>
  );
}

export default Layout;
