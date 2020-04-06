import React from 'react';
import {Link} from 'react-router-dom';
import home_icon from "../assets/images/Icons/Bottom_bar/Home.png";
import products_icon from "../assets/images/Icons/Bottom_bar/Products.png";
import add_product_icon from "../assets/images/Icons/Bottom_bar/Add_product.png";
import cart_icon from "../assets/images/Icons/Bottom_bar/Cart.png";
import mailing_icon from "../assets/images/Icons/Bottom_bar/Mailing.png";


function SidebarMobile(){
    return(
    <div className="bottom_buttons">
        
        <div className="bottom_buton">
        <Link to="/home">
            <img src={home_icon}/>
                <div className="button_bottom_text" >Home</div>
        </Link>
        </div>
        
        <div className="bottom_buton">
        <Link to="/products">
            <img src={products_icon}/>
           <div className="button_bottom_text" >Products</div>
        </Link>
        </div>
        
        
        <div className="bottom_buton">
        <Link to="/products/create">
            <img src={add_product_icon}/>
            <div className="button_bottom_text">Add product</div>
        </Link>
        </div>
        
        
        <div className="bottom_buton">
        <Link to="/cart">
            <img src={cart_icon}/>
            <div className="button_bottom_text">Cart</div>
        </Link>
        </div>
        
        
        <div className="bottom_buton">
        <Link to="/mailing">
            <img src={mailing_icon}/>
            <div className="button_bottom_text">Mailing</div>
        </Link>
        </div>
        

    </div>
    )

}

export default SidebarMobile