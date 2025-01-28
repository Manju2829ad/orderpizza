import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarP.css';


const NavBarP = ({ navItems = [] }) => {
    return (
        <>
            <div id="navbar" className="flex">
                {navItems.map((menu) => (
                    <Link key={menu.id} to={menu.path} style={{ textDecoration: 'none' }}>
                        <div id="links" style={{ marginRight: "10px", position: "relative", bottom: "20px" }}>
                            <h3>{menu.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default NavBarP;
