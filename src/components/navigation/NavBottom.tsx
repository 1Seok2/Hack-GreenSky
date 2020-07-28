import React from 'react';
import MyLogoImg from '../../assets/slimgslogo.jpg';

const NavBottom = () => {
    return (
        <>
            <div className="nav-bottom">
                <img id="mylogo" src={MyLogoImg} alt="logo"/>
            </div>
        </>
    ); 
}

export default NavBottom;