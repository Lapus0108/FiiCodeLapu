import React, {Component} from 'react'
import {connect} from 'react-redux'
//import { addShipping } from './actions/cartActions'

export default class Reciept extends Component {

    componentWillUnmount() {
        if (this.refs.shipping.checked)
            this.props.substractShipping()
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping();
        }
        else {
            this.props.substractShipping();
        }
    }

    render() {

        return (
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange={this.handleChecked}/>
                            <span>Transport: +26 RON</span>
                        </label>
                    </li>
                    <li className="collection-item"><b>Total: {this.props.total} $</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn">Finalizeaza comanda</button>
                </div>
            </div>
        )
    }
}
