import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";

export default class Receipt extends Component {
    constructor(props) {
        super();
        this.state = {
            mesaj: "",
            sale: {
                seller_id: "",
                buyer_id: "",
                quantity: "",
                price: ""
            }
        }
        // this.handleSubmit=this.handleSubmit.bind(this);
        
    }

    handleSubmit(event){
        axiosRequest.post("/orders")
            .then(res => {
                console.log(res);
                
            })
            .catch(error => {
                console.log("registration error", error);
            })
      window.location.href='/products'
      event.preventDefault();
    }

    render() {
        const disableButton= this.props.total>0;
        console.log(disableButton);
        console.log(this.props.items)
        return (
            <>
            <div className="container">
                <div className="collection">
                    <li className="collection-item"><b>Total: {this.props.total} RON</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn" disabled={!disableButton} onClick={this.handleSubmit}>Submit your order
                    </button>
                </div>
            </div>
            </>
        )
    }
}
