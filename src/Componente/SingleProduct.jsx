import React from 'react';
import contact_button from "../images/pngwave.png";
import imagineArticol from "../images/vazatest.jpg";
import remove_article from "../images/remove_product.png";
import edit_article from "../images/edit_article.png";
import axios from "axios";

class SingleProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            product: {
                "id": 7,
                "title": "feafea",
                "description": "ceacea",
                "price": 99,
                "negotiable": 0,
                "seller_id": 1,
            }
        }

    }

    componentWillMount() {
        const url_get = `http://localhost:8000/api/products/`;
        const id_get = this.props.match.params.product;
        axios.get(url_get + id_get)
            .then(res => {
                const product = res.data;
                this.setState({product: product});
            })
    }

    remove_article_function = (e) => {

        const url = `http://localhost:8000/products/`;
        const id = this.state.id;
        e.preventDefault();
        console.log(url + id);
        axios.delete(url + id)
            .then(res => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        return (
            <div className="container_sgrpoduct_total">
                <div className="sgproduct_container">
                    <div className="sgproduct_titleart">Selected article: {this.state.product.title}</div>
                    <div className="sgproduct_title">Price: {this.state.product.price} RON</div>
                    {/*<div className="sgproduct_title">Sold by: {this.state.product.seller_name}</div>*/}
                    {this.state.product.negociabil === true ?
                        <div className="sgproduct_conditionals">! Product is negotiable</div> : "" }
                    {/*{item.exchangeable === true ?*/}
                    {/*<div className="sgproduct_conditionals">! Product(s) in exchange may be accepted by the*/}
                    {/*seller</div> : "" }*/}
                    <div className="sgproduct_title">Description: {this.state.product.description}</div>
                </div>
                <div className="image_container_sgproduct">
                    <img src={imagineArticol} alt="imagine_articol_sgproduct"/>
                </div>

                {this.state.product.seller_id === JSON.parse(localStorage.getItem('user')).id
                    ?
                    <div className="seller_tools" onClick={this.remove_article_function}>
                        <div className="buton_remove_article">
                            <img src={remove_article} alt="remove_article"/>
                        </div>
                        <div className="buton_edit_article">
                            <img src={edit_article} alt="edit_article"/>
                        </div>
                    </div>
                    : ""
                }
            </div>
        )
    }
}
export default SingleProduct;