import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";
import product_image from 'assets/images/vazatest.jpg';
import remove_article from '../../assets/images/Icons/Remove_product.png';
import edit_article from  '../../assets/images/Icons/Edit_product.png';
import sold_article from  '../../assets/images/Icons/Sold_product.png';

export default class ProductsSingle extends Component {

    constructor() {
        super();
        this.state = {
            product: {
                id: 0,
                title: "Test Product",
                description: "This is just a basic product while we load the page. Check your internet connection if it takes too long",
                price: 0,
                negotiable: 0,
                seller_id: 0,
                county_id:"",
                image:""
            },
            redirect: false,
            mesaj: "",
            want_to_edit: false,
            want_to_edit_clicks: 0,
            titleUpdated: "",
            priceUpdated: "",
            descriptionUpdated: "",
            hover_sold:false,
            hover_remove:false,
            hover_edit:false
        }
        this.edit_article = this.edit_article.bind(this);
        this.toggleHover_sold = this.toggleHover_sold.bind(this);
        this.toggleHover_remove = this.toggleHover_remove.bind(this);
        this.toggleHover_edit= this.toggleHover_edit.bind(this);
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products'/>
        }
    }

    toggleHover_sold(){
        this.setState({hover_sold: !this.state.hover_sold})
    }

    toggleHover_remove(){
        this.setState({hover_remove: !this.state.hover_remove})
    }

    toggleHover_edit(){
        this.setState({hover_edit: !this.state.hover_edit})
    }

    getHttpClient() {
        return axios.create({
            baseURL: process.env.REACT_APP_SERVER_APP_URL,
            timeout: 1000,
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': "Bearer " + this.props.user.token
            }
        })
    }

    componentDidMount() {
        const id_get = this.props.match.params.product;
        this.getHttpClient().get("products/" + id_get)
            .then(res => {
                const product = res.data;
                this.setState({product: product, descriptionUpdated: product.description, priceUpdated: product.price});
            })
    }

    remove_article_function = (e) => {
        const id = this.props.match.params.product;
        e.preventDefault();
        this.getHttpClient().delete("products/" + id)
            .then(res => {
                console.log(res.data);
                this.setState({mesaj: "Your product has been deleted from Piazeta!"})
                this.setState({redirect: true})
            })
            .catch((err) => {
                console.log(err);
            })
        e.preventDefault();
    }

    edit_article() {
        this.setState({want_to_edit: true, want_to_edit_clicks: this.state.want_to_edit_clicks + 1})
        console.log(this.state.want_to_edit_clicks)
    }

    handleChange = e => {
        const name = e.target.name;
        this.setState({[name]: e.target.value});
        console.log(this.state)
    };

    inputIsEmpty(){
        if(this.state.product.price===this.state.priceUpdated)
            return true
    }


    handleUpdateProduct = (e) => {
        const product_up = {
            id:this.state.product.id,
            title: this.state.product.title,
            description: this.state.descriptionUpdated,
            price: this.state.priceUpdated,
            negotiable: this.state.product.negotiable,
            seller_id: this.state.product.seller_id,
            county_id: this.state.product.county_id,
            image: this.state.product.image

     };
        this.setState((prevStae, props) => ({
            product: product_up,
            mesaj: "Changes updated !"
        }));

        const id = this.props.match.params.product;

        this.getHttpClient().put('products/' + id, product_up)
            .then(res => {
                console.log(res.data);
            })
            .catch((err) => {
                    console.log(err);
                }
            )
        e.preventDefault();
    };


    render() {


        return (
            <>
            <div className="container_sgrpoduct_total">
                <div className="sgproduct_container">
                    <div className="sgproduct_titleart">Selected article: {this.state.product.title}</div>

                    <div className="sgproduct_containertext">
                        <div className="sgproduct_title">Price: {this.state.product.price} RON</div>
                        {this.state.want_to_edit_clicks % 2 ?
                            <>
                            <input
                                style={{width: 35, marginLeft: 20}}
                                type="price"
                                placeholder="Edit price"
                                onChange={this.handleChange}
                                name="priceUpdated"
                                value={this.state.priceUpdated}
                            />
                             {this.state.product.price!==this.state.priceUpdated ?
                            <button
                                style={{marginLeft: 5}}
                                onClick={this.handleUpdateProduct}
                            >
                                Update
                            </button>
                            : ""}
                            </>
                            : ""}
                    </div>

                    <div className="sgproduct_containertext">
                        <div className="sgproduct_title">Description: {this.state.product.description}</div>

                    </div>
                    {this.state.want_to_edit_clicks % 2 ?
                            <>

                            <input
                                style={{width: 250}}
                                type="text"
                                placeholder="Edit description"
                                onChange={this.handleChange}
                                name="descriptionUpdated"
                                value={this.state.descriptionUpdated}
                            />
                            {this.state.product.description!==this.state.descriptionUpdated ?
                            <button
                                style={{marginLeft: 5}}
                                onClick={this.handleUpdateProduct}>
                                Update
                            </button>
                            : ""}
                            </> : ""}

                    {/*<div className="sgproduct_title">Sold by: {this.state.user.name}</div>*/}
                    {this.state.product.negociabil === true ?
                        <div className="sgproduct_conditionals">! Product is negotiable</div> : "" }
                    {/*{item.exchangeable === true ?*/}
                    {/*<div className="sgproduct_conditionals">! Product(s) in exchange may be accepted by the*/}
                    {/*seller</div> : "" }*/}
                    <div className="mesaj_singleproduct" style={{paddingTop: 20}}>{this.state.mesaj}</div>


                </div>
                <div className="image_container_sgproduct">
                    <img src={product_image} alt="imagine_articol_sgproduct"/>
                </div>

                <div className="seller_tools">
                    {this.state.product.seller_id === this.props.user.id
                        ?
                        <div>

                            <div className="buton_remove_article"
                            onClick={this.remove_article_function}
                            onMouseEnter={this.toggleHover_remove}
                                onMouseLeave={this.toggleHover_remove}>
                            {this.state.hover_remove ? <div className="hover_remove">Remove from market</div> : ""}
                                <img src={remove_article} alt="remove_article"/>
                            </div>

                            <div>
                                <div className="buton_edit_article"
                                onClick={this.edit_article}
                                onMouseEnter={this.toggleHover_edit}
                                onMouseLeave={this.toggleHover_edit}>
                                {this.state.hover_edit ? <div className="hover_edit">Edit your product</div> : ""}
                                    <img src={edit_article} alt="edit_article"/>
                                </div>
                            </div>

                            <div>
                                <div className="buton_sold_article"
                                onClick={this.remove_article_function}
                                onMouseEnter={this.toggleHover_sold}
                                onMouseLeave={this.toggleHover_sold}

                                >
                                {this.state.hover_sold ? <div className="hover_sold">Product sold</div> : ""}

                                    <img src={sold_article} alt="sold_article"/>
                                </div>
                            </div>
                        </div>
                        : <></>
                    }
                </div>
            </div>
            </>
        )
    }
}