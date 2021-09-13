import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { useLocation } from 'react-router-dom';

const MainLayout = ({children}) => {
    const location = useLocation();
    return (
        <div>
            <Header/>
            {children}
            
            {location.pathname === "/" ?  <Footer/> : ""}
          
        </div>
    )
}

export default MainLayout
