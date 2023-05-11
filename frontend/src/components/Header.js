import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import MenuMobile from './MenuMobile';

import closeMenuIcon from '../images/close-icon-mobile-menu.svg';
import hamburger from '../images/hamburger.svg'

function Header(props) {

  return (
    <header className="header page__header">
      <MenuMobile
        emailUser={props.emailUser}
        handleSignout={props.handleSignout}
        isMobileMenuOpen={props.isMobileMenuOpen}/>
      <div className="header__wrapper">
        <div className="logo header__logo"/>
        <Routes>
          <Route path="/sign-in" element={
            <Link to="/sign-up" className='header__link'>Регистрация</Link>
          }/>

          <Route path="/sign-up" element={
            <Link to="/sign-in" className='header__link'>Войти</Link>
          }/>

          <Route path="/" element={(
            <>
              <div className="header__wrapper-info">
                <p className="header__email">{props.emailUser}</p>
                <button onClick={props.handleSignout} className="header__sign-out">Выйти</button>
              </div>
              <button
                className="header__hamburger"
                type="button"
                onClick={props.handleMenuMobileClick}
                style={{
                  backgroundImage: `url(${
                    props.isMobileMenuOpen ? closeMenuIcon : hamburger
                  })`,
                }}/>
            </>
          )}/>
        </Routes>

      </div>
    </header>
  );
}

export default Header;
