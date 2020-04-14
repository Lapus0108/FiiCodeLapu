import React, {Component} from 'react';
import axiosRequest from '../../Utils/axios';
import {Card, Elevation, Icon} from "@blueprintjs/core";
import {store} from 'react-notifications-component';
import tags from '../../assets/data/tags.json';

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

const colors = ["#5c7329", "#548d78", "#c69421", "#cc6f22", "#8c2f0b"];

export default class Products extends Component {

    constructor() {
        super();
        this.state = {
            filterCriteria: 1,
            search: "",
            tagfilter: "",
            produs: [{
                id: "",
                title: "",
                county: "",
                description: "",
                img: "",
                negociabil: "",
                price: "",
                tag: ""
            }]
        }
    }

    handleClick = (item) => {
        axiosRequest.post("/cart/add-product", {product_id: item.id, quantity: 1})
        store.addNotification({
            title: "Product added successfully!",
            message: "To complete your order go to your cart.",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000

            }
        });
    };


    componentDidMount() {
        axiosRequest.get("products")
            .then(res => {
                const produs = res.data;
                this.setState({produs: produs});
            })
    }

    imageSetter() {
        if (this.state.produs.img === "Not set")
            return <div>Nu are imagine</div>
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleTagChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(event.target.value)
        if (event.target.value < 99) {
            axiosRequest.get("products", {params: {tag: event.target.value}})
                .then(res => {
                    const produs = res.data;
                    this.setState({produs: produs});
                })
        } else {
            axiosRequest.get("products")
                .then(res => {
                    const produs = res.data;
                    this.setState({produs: produs});
                })
        }
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value});
    }

    sortFilters = (a, b) => {
        const diff = a.price - b.price;
        const text_compare = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        const date_compare = a.created_at.localeCompare(b.created_at);

        if (this.state.filterCriteria === 2) {
            return date_compare;
        }
        if (this.state.filterCriteria === 3 ||
            this.state.filterCriteria === 1) {
            return -1 * date_compare;
        }
        if (this.state.filterCriteria === 4) {
            return diff;
        }
        if (this.state.filterCriteria === 5) {
            return -1 * diff;
        }
        if (this.state.filterCriteria === 6) {
            return text_compare;
        }
        if (this.state.filterCriteria === 7) {
            return -1 * text_compare;
        }
    }

    render() {
        console.log("Connected user ID:", this.props.user.id)
        console.log(this.state.tagfilter);

        let filteredData = this.state.produs.filter(
            (item) => {
                return item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            });
        console.log(filteredData);

        let itemList = filteredData.sort(this.sortFilters).map(item => {
            item = {...item, quantity: 0}
            return (
                <div className="col-12 col-lg-4 justify-content-center mb-2">
                    <div className="card no-margin" key={item.id}>
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

                        <Card interactive={false} elevation={Elevation.FOUR} className="background-primary h-100">
                            <img className="w-50 h-50" src={item.image} alt=""/>
                            <div className="titlu_products" ><a href={"/products/" + item.id} className="h4 font-main"
                                    style={{color: colors[item.id % 5]}}>{item.title}</a></div>
                            <p className="description-product_products" style={{overflow:'auto', height:75}}>{item.description}</p>
                            <div class="container-fluid">
                                <div class="row justify-content-center">
                                    <p className="color-primary">{item.price} RON </p>
                                    {this.props.isLoggedIn && this.props.user.id !== item.seller_id ?
                                        <Icon className="ml-2" iconSize={Icon.SIZE_LARGE} icon="shopping-cart"
                                              style={{color: 'black', paddingTop: 5}}
                                              onClick={() => {
                                                  this.handleClick(item)
                                              }}/>
                                        : ""}
                                </div>
                            </div>
                        </Card>

                    </div>

                </div>
            )
        })

        return (
            <div className="container">
                <div className="container h-10">
                    <h1 className="row font-main display-1 justify-content-center">Products</h1>
                    <div class="row mb-2">
                        <div class="col-lg-4">
                            <div class="row justify-content-center">
                                <div className="productsFilters">
                                    <label className="font-main">Sort by:
                                        <select className="font-secondary input-secondary"
                                                value={this.state.filterCriteria}
                                                onChange={this.handleChange}
                                                name="filterCriteria">
                                            {filterCriterias.map((item, key) => {
                                                return (
                                                    <option value={item.id}
                                                            onChange={this.handleChange}>{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 justify-content-center">
                            <input
                                className="input-secondary font-secondary mb-2"
                                type="text"
                                placeholder={"Explore our market..."}
                                value={this.state.search}
                                onChange={this.updateSearch}/>

                        </div>
                        <div class="col-lg-4">
                            <div class="row justify-content-center">
                                <label style={{display: 'contents', fontFamily: 'Franchise', marginRight: 5}}>Filter by
                                    category:
                                    <select
                                        value={this.state.tagfilter}
                                        className="font-secondary input-secondary"
                                        onChange={this.handleTagChange}
                                        name="tagfilter"
                                        style={{borderRadius: 5, marginLeft: 5}}>
                                        {tags.map((item, key) => {
                                            return (
                                                <option value={item.id}
                                                        onChange={this.handleTagChange}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row h-80 pb-5">
                    {itemList}
                </div>
                <div className="spatiu_gol"></div>
            </div>
        )
    }
}
