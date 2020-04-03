import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import ReceiptContainer from "../../Containers/Cart/ReceiptContainer";

import arrowUp from "../../assets/images/Icons/Diverse/Arrow_up.png";
import arrowDown from "../../assets/images/Icons/Diverse/Arrow_down.png";
import remove from "../../assets/images/Icons/Diverse/Remove_product.png";


export default class Cart extends Component {

    //to remove the item completely
    handleRemove = (item) => {
        this.props.removeItem(item);
    }
    //to add the quantity
    handleAddQuantity = (item) => {
        this.props.addQuantity(item);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (item) => {
        this.props.subtractQuantity(item);
    }

    render() {
        console.log(this.props.items)
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={item.image} className=""/>
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.title}</span>
                                <p>{item.desc}</p>
                                <p><b>Price: {item.price*item.quantity} RON</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b>
                                </p>
                                    
                                <div className="add-remove">
                                    {item.quantity<item.max_quantity ?
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleAddQuantity(item)
                                    }}>
                                        <div className="arrowup"><img src={arrowUp} alt="arrowup"/></div>
                                    </i></Link>
                                    : ""}
                                    {item.quantity>1 ?
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleSubtractQuantity(item)
                                    }}>
                                        <div className="arrowdown"><img src={arrowDown} alt="arrowdown"/></div>
                                    </i></Link>
                                    : ""}

                                    <div className="remove_cart" onClick={() => {
                                    this.handleRemove(item)
                                }}>
                                    <img src={remove} alt="remove_from_cart"/>
                                </div>
                                </div>
                               
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p style={{marginRight: 37}}>Your cart is empty!</p>
            )
        return (
            <div className="container">
                <div className="cart_titlu">
                    <h5>Your cart:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <ReceiptContainer />
            </div>
        )
    }
}