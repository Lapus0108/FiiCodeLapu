import React, {Component} from 'react';
import axios from "axios";
import StarRatingComponent from 'react-star-rating-component';

export default class ConfirmSale extends Component {
    constructor() {
        super();
        this.state = {
            confirmed: false,
            product:{
                name:"",
                quantity:"",
                total:"",
                image:""
            },
            buyer:{
                name:"",
                county:"",
                image:""
            },
            sale:{
                
            },
            rating:1
        }

    this.handleClick = this.handleClick.bind(this);
  
   
    }

    getHttpClient() {
        return axios.create({
            baseURL: process.env.REACT_APP_SERVER_APP_URL,
            timeout: 1000,
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })
    }


    componentDidMount(){
        const id_sale = 2;
        this.getHttpClient().get("sale/" + id_sale)
            .then(res => {
                const product = res.data.product;
                const buyer= res.data.buyer;
                const sale= res.data.sale;
                this.setState({
                    product:product,
                    buyer:buyer,
                    sale:sale
                });
            })
    }

    handleClick() {
        this.setState({confirmed: true});
      }

    refuseTransaction(){

    }

    
    render() {
      
        return (
            <>
            <div className="confirmation_title">This is the summary of the order you just received:</div>
            
            <div className="info_tranzactie_confirmation">
                <div className="product_info">
                    <div className="product_row_title">Product info:</div>
                    <div className="product_row">Product name: {this.state.product.name}</div>
                    <div className="product_row">Quantity: {this.state.product.quantity}</div>
                    <div className="product_row">Total: {this.state.product.total} RON</div>
                    
                </div>
                <div className="buyer_info">
                <div className="product_row_title">Buyer info:</div>
                    <div className="product_row">Buyer name: {this.state.buyer.name}</div>
                    <div className="product_row">Buyer county: {this.state.buyer.county}</div>
                </div>
                <div className="logo_piazeta_confirmation">Piazeta</div>
            </div>

           
            <div className="container_agree_transaction">
                 {this.state.confirmed===false ?
                 <>
                <div className="text_agree_transaction">Do you agree to complete the order by getting in touch with the buyer? </div>
                <div className="container_butoane_agree_transaction">
                    <button onClick={this.handleClick}>Yes</button>
                    <button onClick={this.refuseTransaction}>No</button>
                </div>
                </>
                : <div className="text_agree_transaction">This order has  been agreed. Thank you! </div>}
                
            </div>
            </>
        )
    }
}