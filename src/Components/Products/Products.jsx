import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import simbolCart from '../../assets/images/Icons/Cart_add.png';

const filterCriterias=[
    {
        id:1,
        name:"No filter"
    },
    {
        id:2,
        name:"Date ASC"
    },
    {
        id:3,
        name:"Date DESC"
    },
    {
        id:4,
        name:"Price ASC"
    },
    {
        id:5,
        name:"Price DESC"
    },
    {
        id:6,
        name:"Name ASC"
    },
    {
        id:7,
        name:"Name DESC"
    }]

export default class Products extends Component {

     constructor() {
        super();
        this.state = {
            filterCriteria:1,
            produs: [{
                id: "",
                name: "",
                county: "",
                description: "",
                img: "",
                negociabil: "",
                price: "",
                tag:""
            }]
        }
        this.handleChange=this.handleChange.bind(this);
        this.sortFilters=this.sortFilters.bind(this);

    }

    handleClick = (item) => {
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
            })
        console.log(this.props.isLoggedIn);

    }
    
    imageSetter(){
        if(this.state.produs.img==="Not set")
            return <div>Nu are imagine</div>
    }
     
     handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    sortFilters(a, b) {
        const diff = a.price - b.price;
        const text_compare=a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        const date_compare=a.created_at.localeCompare(b.created_at);
    
        if (this.state.filterCriteria == 2) {
            return date_compare;
        }
        if (this.state.filterCriteria == 3) {
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
        
        const isLoggedIn = this.props;
        let sortChoice=this.state.filterCriteria
        const data=this.state.produs;
        console.log(data.sort(this.sortFilters))
        console.log("Connected user ID:" ,this.props.user.id)
        
        switch (sortChoice) {
            case 'priceAsc':
                data.sort(this.sortFilters);
                break;
        }
    
        let itemList = data.map(item => {
            item = { ...item, quantity: 0}
            return (
                 <div className="card" key={item.id}>
                        <Link to={`/products/${item.id}`}>
                            <div className="card-image" >
                                <div className="product_image_container">
                                    <img src={item.image} alt=""/>
                                </div>
                                <span className="card-title">{item.title}</span>
                            </div>

                        </Link>
                            <div className="card-content">
                                <div className="description_product">
                                    <p>{item.description}</p>
                                </div>
                                    <p><b>Pret: {item.price}{" "}RON
                            {isLoggedIn && this.props.user.id!==item.seller_id ?
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"
                                      onClick={() => {this.handleClick(item)}}>
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
