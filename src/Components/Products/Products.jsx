import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addToCart} from "../../Actions/Cart/cartActions";
import simbolMesaj from "../../assets/images/pngwave.png";
import simbolCart from "../../assets/images/cart.png";
import axios from "axios";
import {Link} from "react-router-dom";

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

    componentDidMount() {
        axios.get("http://localhost:8000/api/products")
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
                            <img src={item.img} alt=""/>
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
                            <p>{item.desc}</p>
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
