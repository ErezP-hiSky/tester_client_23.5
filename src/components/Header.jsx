import React from 'react';
import '../sass/main.scss';
import logo from '../images/hiskyLogo.PNG';


function Header() {
    return (
        <header>
            <div className="header_container">
                <img src={logo} alt="hisky-logo" className="header_container__logo"/>
                <h1 className="header_container__text"> Tester Data Base </h1>
            </div>
        </header>
    );
}

export default Header;
