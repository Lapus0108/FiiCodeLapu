import React from 'react';
import {Link} from 'react-router-dom'
import cartsimbol from "../images/cart2.png";
const Navbar = () => {
    return (
        <nav className="nav-wrapper">
            <div className="container">

                <ul className="right">

                    <li><Link to="/products">Produse</Link></li>
                    <li><Link to="/cart">Cosul meu</Link></li>
                    <li><Link to="/cart"><i className="material-icons"><img src={cartsimbol} alt="logo"/></i></Link>
                    </li>

                </ul>
            </div>
        </nav>


    )
}

export default Navbar;