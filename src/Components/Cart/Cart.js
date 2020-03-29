import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import ReceiptContainer from "../../Containers/Cart/ReceiptContainer";

import arrowUp from "../../assets/images/Icons/Diverse/Arrow_up.png";
import arrowDown from "../../assets/images/Icons/Diverse/Arrow_down.png";


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
                                <p><b>Pret: {item.price}$</b></p>
                                <p>
                                    <b>Cantitate: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleAddQuantity(item)
                                    }}>
                                        <div className="arrowup"><img src={arrowUp} alt="arrowup"/></div>
                                    </i></Link>
                                    <Link to="/cart"><i className="material-icons" onClick={() => {
                                        this.handleSubtractQuantity(item)
                                    }}>
                                        <div className="arrowdown"><img src={arrowDown} alt="arrowdown"/></div>
                                    </i></Link>
                                </div>
                                <button className="waves-effect waves-light btn pink remove" onClick={() => {
                                    this.handleRemove(item)
                                }}>Elimina
                                </button>
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p>Cosul tau este gol.</p>
            )
        return (
            <div className="container">
                <div className="cart">
                    <h5>Ai comandat:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <ReceiptContainer />
            </div>
        )
    }
}