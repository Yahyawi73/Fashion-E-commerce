import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from './Auth/SignOut';


const NavBar = ({ session }) => (
    <nav>
        {session && session.getCurrentUSer ? <NavBarAuth session={session} /> : <NavBarUnAuth />}
    </nav>
);

const NavBarAuth = ({ session }) => (
    <ul className="nav-bar">
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
            <NavLink to='/favoris' exact>Favoris</NavLink>
        </li>
        <li>
            <NavLink to='/order' exact>Order</NavLink>
        </li>
        <li className="user-title">
            Welcome, <strong>{session.getCurrentUSer.userName}</strong>
        </li>
        <li>
            <SignOut />
        </li>
    </ul>
)

const NavBarUnAuth = () => (
    <ul className="nav-bar">
        <li>
            <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
            <NavLink to='/signin' exact>SignIn</NavLink>
        </li>
        <li>
            <NavLink to='/signup' exact>SignUp</NavLink>
        </li>
        <li>
            <NavLink to='/publicity' exact>Publicity</NavLink>
        </li>
    </ul>
);

export default NavBar;