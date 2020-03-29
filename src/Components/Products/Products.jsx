import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

import simbolCart from '../../assets/images/Icons/Cart_add.png';

export default class Products extends Component {

    constructor() {
        super();

        this.state = {
            produs: [{
                id: "",
                name: "",
                county: "",
                description: "",
                img: "",
                negociabil: "",
                price: "",
                tag:""
            }
            ]
        }

    }

    handleClick = (item) => {
        console.log(item);
        this.props.addToCart(item);
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

    componentDidMount() {
        this.getHttpClient().get("products")
            .then(res => {
                const produs = res.data.data;
                this.setState({produs: produs});
                console.log(this.state.produs);
            })
        console.log(this.props.isLoggedIn);

    }

    imageSetter(){
        if(this.state.produs.img==="Not set")
            return <div>Nu are imagine</div>
     }

    render() {
        const isLoggedIn = this.props;
       
        let itemList = this.state.produs.sort(function (a, b) {     //FILTRU PRET CRESCATOR
            return a.price - b.price;
        }).map(item => {
            item = { ...item, quantity: 0}
            console.log(item, "hey")
            return (
                
                
                    <div className="card" key={item.id}>
                            <Link to={`/products/${item.id}`}>
                        <div className="card-image" >
                            <div className="product_image_container">
                            <img src={item.image} alt=""/>
                            </div>
                            <span className="card-title">{item.title}
                          
                            </span>

                        </div>
                             </Link>
                        <div className="card-content">
                            <div className="description_product">
                            <p>{item.description}</p>
                            </div>
                            <p><b>Pret: {item.price}{" "}RON
                            {isLoggedIn ? 
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"
                                      onClick={() => {
                                          this.handleClick(item)
                                      }}>
                            <img src={simbolCart} alt="Logo"/></span>
                            : ""}
                            </b></p>
                        </div>
                    </div>
                

            )
        })


        return (
            <div className="container">
                <h3 className="center_title">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
