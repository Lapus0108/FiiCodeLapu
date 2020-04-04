import React, {Component} from 'react';
import axiosRequest from "../../Utils/axios";
import return_site from "../../assets/images/return_site.png";

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
        window.location.href='/products';
    }

    render() {
            console.log(this.state.products);
        return (
            this.state.products[0].seller_id!==this.props.user.id ?

            <>
                <div className="mesaj_not_your_order">This is not your order and you can't access it.</div>
                <div className="goback_not_your_order">To return to our site you can click here: </div>
                    <div onClick={()=> window.location.href='/home'}>
                        <img src={return_site} style={{width:40, height:40}}/>
                    </div>
            </>
            :
            <>
            <div className="confirmation_title">This is the summary of the order you just received:</div>

            <div className="info_tranzactie_confirmation">
                <div className="product_info">
                    <div className="product_row_title">Product info:</div>
                    <div className="container_produse_confirm_sale">
                    {this.state.products.map((item,index)=>{return(
                    <>
                    <div className="product_row_product_title">{index+1}.Product name: {item.title}</div>
                    <div className="product_row">Quantity: {item.pivot.quantity}</div>
                    <div className="product_row">Total: {item.pivot.quantity * item.price} RON</div>
                    </>
                    )})}
                    </div>
                </div>
                <div className="buyer_info">
                    <div className="product_row_title">Buyer info:</div>
                    <div className="product_row">Buyer name: {this.state.buyer.name}</div>
                    <div className="product_row">Buyer county: {this.state.buyer.county}, Romania</div>
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