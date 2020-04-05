import React, {Component} from 'react';
import {Link} from "react-router-dom";
import simbolCart from '../../assets/images/Icons/Cart_add.png';
import axiosRequest from '../../Utils/axios';
import {Button, Card, Elevation, Icon} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons"

const filterCriterias = [
    {
        id: 1,
        name: "No filter"
    },
    {
        id: 2,
        name: "Date ASC"
    },
    {
        id: 3,
        name: "Date DESC"
    },
    {
        id: 4,
        name: "Price ASC"
    },
    {
        id: 5,
        name: "Price DESC"
    },
    {
        id: 6,
        name: "Name ASC"
    },
    {
        id: 7,
        name: "Name DESC"
    }]

const colors = ["#5c7329", "#5c7329", "#c69421", "#cc6f22", "#8c2f0b"];

export default class Products extends Component {

    constructor() {
        super();
        this.state = {
            filterCriteria: 1,
            produs: [{
                id: "",
                name: "",
                county: "",
                description: "",
                img: "",
                negociabil: "",
                price: "",
                tag: ""
            }]
        }
        this.handleChange = this.handleChange.bind(this);
        this.sortFilters = this.sortFilters.bind(this);

    }

    handleClick = (item) => {
        axiosRequest.post("/cart/add-product", {product_id: item.id, quantity: 1})
    };


    componentDidMount() {
        axiosRequest.get("products")
            .then(res => {
                const produs = res.data;
                this.setState({produs: produs});
            })
        console.log(this.props.isLoggedIn);
    }

    imageSetter() {
        if (this.state.produs.img === "Not set")
            return <div>Nu are imagine</div>
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    sortFilters(a, b) {
        const diff = a.price - b.price;
        const text_compare = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        const date_compare = a.created_at.localeCompare(b.created_at);

        if (this.state.filterCriteria == 2) {
            return date_compare;
        }
        if (this.state.filterCriteria == 3 ||
            this.state.filterCriteria == 1) {
            return -1 * date_compare;
        }
        if (this.state.filterCriteria == 4) {
            return diff;
        }
        if (this.state.filterCriteria == 5) {
            return -1 * diff;
        }
        if (this.state.filterCriteria == 6) {
            return text_compare;
        }
        if (this.state.filterCriteria == 7) {
            return -1 * text_compare;
        }
    }

    render() {
        const data = this.state.produs;
        console.log("Connected user ID:", this.props.user.id)

        let itemList = data.sort(this.sortFilters).map(item => {
            item = {...item, quantity: 0}
            return (
                <div className="card" key={item.id}>
                    {/*<Link to={`/products/${item.id}`}>*/}
                    {/*<div className="card-image" >*/}
                    {/*<div className="product_image_container">*/}
                    {/*<img src={item.image} alt=""/>*/}
                    {/*</div>*/}
                    {/*<span className="card-title">{item.title}</span>*/}
                    {/*</div>*/}

                    {/*</Link>*/}
                    {/*<div className="card-content">*/}
                    {/*<div className="description_product">*/}
                    {/*<p>{item.description}</p>*/}
                    {/*</div>*/}
                    {/*<p><b>Pret: {item.price}{" "}RON*/}
                    {/*{isLoggedIn && this.props.user.id!==item.seller_id ?*/}
                    {/*<span to="/" className="btn-floating halfway-fab waves-effect waves-light red"*/}
                    {/*onClick={() => {this.handleClick(item)}}>*/}
                    {/*<img src={simbolCart} alt="Logo"/></span>*/}
                    {/*: ""}*/}
                    {/*</b></p>*/}
                    {/*</div>*/}
                    <Card interactive={false} elevation={Elevation.FOUR} style={{backgroundColor: "#edd294", height:"100%"}}>
                        <img src={item.image} alt=""/>
                        <h5 style={{color: colors[item.id % 5]}}>{item.title}</h5>
                        <p style={{color: "white"}}>{item.description}</p>
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <p style={{color: "white", marginRight: "10px"}}>{item.price} RON </p>
                                {this.props.isLoggedIn && this.props.user.id !== item.seller_id ?
                                    <Icon icon="shopping-cart" onClick={() => {this.handleClick(item)}}/>
                                    : ""}
                            </div>
                        </div>
                    </Card>
                </div>
            )
        })

        return (
            <div className="container">
                <h3 className="center_title">Products</h3>
                <div className="productsFilters">
                    <label>Sort by:
                        <select value={this.state.filterCriteria} onChange={this.handleChange} name="filterCriteria">
                            {filterCriterias.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.name}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>

                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
