import React, {Component} from 'react';
import poza_profil from '../assets/images/vazatest.jpg';
import your_products from '../assets/images/Icons/Published.png';
import purchased_products from '../assets/images/Icons/Cart_full.png';
import Moment from 'react-moment';
import axiosRequest from '../Utils/axios';
import background_profile from '../assets/images/buttons/template.svg';

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            county: "",
            image: "",
            seePublished: false,
            seePurchased: false,
            my_products: [],
            bought_products: []
        }
        this.showPublished = this.showPublished.bind(this);
        this.showPurchased = this.showPurchased.bind(this);
    }

    componentDidMount() {
        axiosRequest.get("user/products")
            .then(res => {
                const products = res.data;
                this.setState({my_products: products});
            })
        axiosRequest.get("user/buys")
            .then(res => {
                const products = res.data;
                this.setState({bought_products: products});
                console.log(products)
            })
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            image: this.props.user.image
        })
    }

    showPublished() {
        console.log("Show published clicked");
        this.setState({seePublished: true, seePurchased: false})

    }

    showPurchased() {
        console.log("Show purchased clicked");
        this.setState({seePurchased: true, seePublished: false})
    }

    render() {

        return (
            <div class="container-fluid h-100">
                <div class="row h-100">
                    <div class="col col-xl-6 h-50 mb-2">
                        {/* <img src={background_profile}/> */}
                        <div className="container_user_info_profile h-100">

                            <div className="container_imagine_profile">
                                <img src={this.state.image}/>
                                {this.props.isLoggedIn ?
                                    <div className="status_user" style={{color: "#18ba44", fontWeight: 600}}>LOGGED
                                        IN</div>
                                    : <div className="status_user" style={{color: "red"}}>NOT LOGGED IN</div>}
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className="container_date_profile">
                                        <div className="info_user_text">Username: {this.state.name}</div>
                                        <div className="info_user_text">Email: {this.state.email}</div>
                                        <div className="info_user_text">County: Iasi, Romania</div>
                                        <div className="info_user_text">
                                            <div>Click to see to see your published articles</div>
                                            <img src={your_products} onClick={this.showPublished}/>
                                        </div>
                                        <div className="info_user_text">
                                            <div>Click to see the purchased items</div>
                                            <img src={purchased_products} onClick={this.showPurchased}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.seePublished ?
                        <div class="container-fluid h-50">
                            <div class="row pb-5">
                                <div class="col-xl-6">
                                    <div className="container_tranzactii w-100">
                                        <div className="titlu_tranzactii">Your last products published on the market:
                                        </div>
                                        <div className="container_ultimele_tranzactii">
                                            {this.state.my_products.reverse().map((item) => {
                                                return (

                                                    <div className="tranzactie">
                                                        <div className="col no-margin mr-1 ml-1">
                                                            Product: {item.title}</div>
                                                        <div className="col no-margin mr-1 ml-1">
                                                            Price: {item.price} RON
                                                        </div>
                                                        <div className="col no-margin mr-1 ml-1">Published
                                                            on: {" "}
                                                            <Moment format="DD.MM.YYYY">{item.created_at}</Moment>
                                                        </div>
                                                        {!item.sold_out ?
                                                            <div className="col no-margin mr-1 ml-1">Status:
                                                                Available</div>
                                                            :
                                                            <div className="col no-margin mr-1 ml-1">Status:
                                                                Unavailable</div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ""}

                    {this.state.seePurchased ?
                        <div class="container-fluid h-50">
                            <div class="row pb-5">
                                <div class="col col-xl-6">
                                    <div className="container_tranzactii">
                                        <div className="titlu_tranzactii">Your last products bought from the market:
                                        </div>
                                        <div className="container_ultimele_tranzactii">
                                            {this.state.bought_products.map((item) => {
                                                return (

                                                    <div className="tranzactie">

                                                        <div className="col no-margin mr-1 ml-1">Product: {item.title}
                                                            ({item.pivot.quantity})
                                                        </div>
                                                        <div className="col no-margin mr-1 ml-1l">Price: {item.price * item.pivot.quantity}
                                                            RON
                                                        </div>
                                                        <div className="col no-margin mr-1 ml-1">Bought on:{" "}
                                                            <Moment format="DD.MM.YYYY">2020-03-29 14:37:19</Moment>
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        : ""}
                </div>
            </div>
        )

    }
}