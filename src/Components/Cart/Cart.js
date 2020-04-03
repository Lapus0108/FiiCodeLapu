import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axiosRequest from '../../Utils/axios'

import ReceiptContainer from "../../Containers/Cart/ReceiptContainer";

import arrowUp from "../../assets/images/Icons/Diverse/Arrow_up.png";
import arrowDown from "../../assets/images/Icons/Diverse/Arrow_down.png";
import remove from "../../assets/images/Icons/Diverse/Remove_product.png";
import Receipt from "./Receipt";


export default class Cart extends Component {

    constructor() {
        super()
        this.state = {
            products: "",
            total: ""
        }
    }

    updateCart() {
        axiosRequest.get("cart")
            .then(res => {
                const products = res.data.products;
                const total = res.data.total
                this.setState({products: products, total: total});
            })
        console.log(this.props.isLoggedIn);
    }

    componentDidMount() {
        this.updateCart();
    }

    //to remove the item completely
    handleRemove = (item) => {
        axiosRequest.post("cart/remove-product", {
            product_id: item.id,
            new_total: item.pivot.quantity * item.price
        });
        this.updateCart()
    }
    //to change the quantity
    handleQuantity = (item, quantity) => {
        axiosRequest.post("cart/change-product", {
            product_id: item.id,
            quantity: item.pivot.quantity + quantity,
            new_total: item.price * quantity
        })
        this.updateCart()
    }


    render() {
        console.log(this.state.products)
        let addedItems = this.state.products.length ?
            (
                this.state.products.map(item => {
                    return (

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={item.image} className=""/>
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.title}</span>
                                <p>{item.desc}</p>
                                <p><b>Price: {item.price * item.pivot.quantity} RON</b></p>
                                <p>
                                    <b>Quantity: {item.pivot.quantity}</b>
                                </p>

                                <div className="add-remove">
                                    {item.pivot.quantity < item.max_quantity ?
                                        <Link to="/cart"><i className="material-icons" onClick={() => {
                                            this.handleQuantity(item, 1)
                                        }}>
                                            <div className="arrowup"><img src={arrowUp} alt="arrowup"/></div>
                                        </i></Link>
                                        : ""}
                                    {item.pivot.quantity > 1 ?
                                        <Link to="/cart"><i className="material-icons" onClick={() => {
                                            this.handleQuantity(item, -1)
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
                <Receipt total={this.state.total}/>
            </div>
        )
    }
}