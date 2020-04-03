import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";

export default class Receipt extends Component {
    constructor(props) {
        super();
        this.state = {
            redirect: false,
            mesaj: "",
            sale: {
                seller_id: "",
                buyer_id: "",
                quantity: "",
                price: ""
            }
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Products'/>
        }
    }

    handleSubmit(event){
        event.preventDefault();
        axiosRequest.post("/orders")
            .then(res => {
                console.log(res);
                return <Redirect to='/Products'/>
            })
            .catch(error => {
                console.log("registration error", error);
            })
    }


    render() {
        console.log(this.props.items)
        return (
            <>
            <div className="container">
                <div className="collection">
                    <li className="collection-item"><b>Total: {this.props.total} RON</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn" onClick={this.handleSubmit}>Submit your order
                    </button>
                </div>
            </div>
            </>
        )
    }
}
