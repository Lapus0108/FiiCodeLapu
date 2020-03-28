import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

import simbolCart from 'assets/images/cart.png';

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
                price: ""
            }
            ]
        }

    }

    handleClick = (id) => {
        this.props.addToCart(id);
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
            })

    }

    render() {
        const {isLoggedIn} = this.props;
        console.log(isLoggedIn)
        let itemList = this.state.produs.sort(function (a, b) {     //FILTRU PRET CRESCATOR
            return a.price - b.price;
        }).map(item => {
            return (
                <Link to={`/products/${item.id}`}>
                    <div className="card" key={item.id}>
                        <div className="card-image">
                            <img src={item.image} alt=""/>
                            <span className="card-title">{item.title}</span>
                            {isLoggedIn === true ?
                                <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"
                                      onClick={() => {
                                          this.handleClick(item.id)
                                      }}><i className="material-icons">
                        <img src={simbolCart} alt="Logo"/></i></span>
                                : ""}

                        </div>

                        <div className="card-content">
                            <p>{item.description}</p>
                            <p><b>Pret: {item.price}{" "}RON</b></p>
                        </div>
                    </div>
                </Link>

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
