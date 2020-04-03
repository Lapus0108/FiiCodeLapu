import React, {Component} from 'react';
import axiosRequest from "../../Utils/axios";

export default class ConfirmSale extends Component {
    constructor() {
        super();
        this.state = {
            confirmed: false,
            products: [{
                id: "",
                title: "",
                description: "",
                price: "",
                pivot: {}
            }],
            buyer: {
                name: "",
                county: "",
                image: ""
            },
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        axiosRequest.get("orders/" + this.props.match.params.id)
            .then(res => {
                this.setState({
                    products: res.data.products,
                    buyer: res.data.buyer,
                });
            })
    }

    handleClick(status) {
        axiosRequest.post("orders/" + this.props.match.params.id, {confirmed: status})
    }

    render() {
        console.log(this.state.products)
        return (
            <>
            <div className="confirmation_title">This is the summary of the order you just received:</div>

            <div className="info_tranzactie_confirmation">
                <div className="product_info">
                    <div className="product_row_title">Product info:</div>
                    <div className="product_row">Product name: {this.state.products[0].title}</div>
                    <div className="product_row">Quantity: {this.state.products[0].pivot.quantity}</div>
                    <div className="product_row">Total: {this.state.products[0].pivot.quantity * this.state.products[0].price} RON</div>
                </div>
                <div className="buyer_info">
                    <div className="product_row_title">Buyer info:</div>
                    <div className="product_row">Buyer name: {this.state.buyer.name}</div>
                    <div className="product_row">Buyer county: {this.state.buyer.county}</div>
                </div>
                <div className="logo_piazeta_confirmation">Piazeta</div>
            </div>


            <div className="container_agree_transaction">
                {this.state.confirmed === false ?
                    <>
                    <div className="text_agree_transaction">Do you agree to complete the order by getting in touch with
                        the buyer?
                    </div>
                    <div className="container_butoane_agree_transaction">
                        <button onClick={() => this.handleClick(true)}>Yes</button>
                        <button onClick={() => this.handleClick(false)}>No</button>
                    </div>
                    </>
                    : <div className="text_agree_transaction">This order has been agreed. Thank you! </div>}

            </div>
            </>
        )
    }
}