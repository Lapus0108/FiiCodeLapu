import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";
import { store } from 'react-notifications-component';

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
    }

    handleSubmit(event){
        axiosRequest.post("/orders")
            .then(res => {
                console.log(res);
                
            })
            .catch(error => {
                console.log("registration error", error);
            })
        const timer = setTimeout(() => {
            window.location.href='/products'
            }, 3500);

      event.preventDefault();

      store.addNotification({
        title: "Order received successfully!",
        message: "For more details about your transaction and further instructions please check your e-mail!",
        type: "success",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000

        }
      });
    }

    render() {
        const disableButton = this.props.total>0;
        console.log(disableButton);
        console.log(this.props.items)
        return (
            <>
            <div className="container">
                <div className="collection">
                    <li className="collection-item"><b>Total: {this.props.total} RON</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn input-button-main" disabled={!disableButton} onClick={this.handleSubmit}>Submit your order
                    </button>
                </div>
            </div>
            </>
        )
    }
}
