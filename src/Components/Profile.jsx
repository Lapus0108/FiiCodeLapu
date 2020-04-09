import React, {Component} from 'react';
import your_products from '../assets/images/Icons/Published.png';
import purchased_products from '../assets/images/Icons/Cart_full.png';
import Moment from 'react-moment';
import axiosRequest from '../Utils/axios';
import { store } from 'react-notifications-component';
import edit_user from '../assets/images/Icons/Edit_user.png';
import edit_user2 from '../assets/images/Icons/Edit_product.png';


export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phone:"",
            address:"",
            county: "",
            image: "",
            seePublished: false,
            seePurchased: false,
            my_products: [],
            bought_products: [],
            want_to_edit_user:false,
            want_to_edit_phone:false,
            want_to_edit_address:false,
            usernameUpdated:"",
            phoneUpdated:"",
            addressUpdated:"",
        }
        this.showPublished = this.showPublished.bind(this);
        this.showPurchased = this.showPurchased.bind(this);
        this.edit_user=this.edit_user.bind(this);
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
                })
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            image: this.props.user.image,
            phone:this.props.user.phone,
            address:this.props.user.address
        })
    }

    showPublished() {
        console.log("Show published clicked");
        this.setState({seePublished: true, seePurchased: false})
        if(this.state.my_products.length===5){
            store.addNotification({
                title: "Congratulations!",
                message: "You have just published your first 5 articles on Piazeta!",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000
                 }
              });
        }
        if(this.state.my_products.length===10){
            store.addNotification({
                title: "Congratulations!",
                message: "You are very active on Piazeta! We are very happy to see your 10th published article! Keep going!",
                type: "success",
                insert: "bottom",
                container: "bottom-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000
                 }
              });
        }
    }

    showPurchased() {
        console.log("Show purchased clicked");
        this.setState({seePurchased: true, seePublished: false})
    }

    handleChange = e => {
        const name = e.target.name;
        this.setState({[name]: e.target.value});
        console.log(this.state)
    };

    edit_user() {
        this.setState({
            want_to_edit_user:!this.state.want_to_edit_user
        })
    }
    edit_email=() => {
        this.setState({
            want_to_edit_email:!this.state.want_to_edit_email
        })
    }
    edit_phone=() => {
        this.setState({
            want_to_edit_phone:!this.state.want_to_edit_phone
        })
    }
    edit_address=() => {
        this.setState({
            want_to_edit_address:!this.state.want_to_edit_address
        })
    }



    handleUpdateUser = (e) => {

        this.setState((prevState, props) => ({
            name:this.state.usernameUpdated ? this.state.usernameUpdated : this.props.user.name,
            address:this.state.addressUpdated ? this.state.addressUpdated : this.props.user.address,
            phone:this.state.phoneUpdated ? this.state.phoneUpdated :this.props.user.phone
         }));

         const user_updated = {
            name:this.state.usernameUpdated ? this.state.usernameUpdated : this.props.user,
            address:this.state.addressUpdated ? this.state.addressUpdated : this.props.user.address,
            phone:this.state.phoneUpdated ? this.state.phoneUpdated : this.props.user.phone,
            image:this.state.image
     };

        axiosRequest.put('user/update', user_updated)
            .then(res => {
                console.log(res.data);
                this.props.doLogin(res.data)
             })
            .catch((err) => {
                    console.log(err);
                }
            )
        e.preventDefault();
        store.addNotification({
            title: "User details updated!",
            message: "From this point, the other users will only see your new account details",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000

            }
          });

    };


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
                            <div className="status_user" style={{color: "#18ba44", fontWeight: 600}}>LOGGED IN</div>
                            : <div className="status_user" style={{color: "red"}}>NOT LOGGED IN</div>}
                    </div>
                    <div class="row">
                        <div class="col">
                    <div className="container_date_profile">
                        <div className="info_user_text">
                            <div>
                                Username: {this.state.name}
                            </div>
                            <img src={edit_user} onClick={this.edit_user}/>
                        </div>

                        {this.state.want_to_edit_user ?
                            <div className="info_user_text">

                            <input
                                style={{width: 250}}
                                type="text"
                                placeholder="Edit username"
                                onChange={this.handleChange}
                                name="usernameUpdated"
                                value={this.state.usernameUpdated}
                            />
                            {this.state.name!==this.state.usernameUpdated ?
                            <button
                                style={{marginLeft: 5}}
                                onClick={this.handleUpdateUser}>
                                Update
                            </button>
                            : ""}
                            </div> : ""}




                        <div className="info_user_text">
                            <div>Email: {this.state.email}</div>
                        </div>

                        <div className="info_user_text">
                            <div>Phone number: {this.state.phone}</div>
                            <img src={edit_user2} onClick={this.edit_phone}/></div>

                            {this.state.want_to_edit_phone ?
                            <div className="info_user_text">

                            <input
                                style={{width: 250}}
                                type="text"
                                placeholder="Edit phone number"
                                onChange={this.handleChange}
                                name="phoneUpdated"
                                value={this.state.phoneUpdated}
                            />
                            {this.state.phone!==this.state.phoneUpdated ?
                            <button
                                style={{marginLeft: 5}}
                                onClick={this.handleUpdateUser}>
                                Update
                            </button>
                            : ""}
                            </div> : ""}


                        <div className="info_user_text">
                            <div>Address: {this.state.address}</div>
                            <img src={edit_user2} onClick={this.edit_address}/></div>

                            {this.state.want_to_edit_address ?
                            <div className="info_user_text">

                            <input
                                style={{width: 250}}
                                type="text"
                                placeholder="Edit address"
                                onChange={this.handleChange}
                                name="addressUpdated"
                                value={this.state.addressUpdated}
                            />
                            {this.state.address!==this.state.addressUpdated ?
                            <button
                                style={{marginLeft: 5}}
                                onClick={this.handleUpdateUser}>
                                Update
                            </button>
                            : ""}
                            </div> : ""}
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
                        <div className="titlu_tranzactii">Your last products published on the market:</div>
                        <div className="container_ultimele_tranzactii">
                            {this.state.my_products.reverse().map((item) => {
                                return (
                                    <div className="tranzactie">
                                        <div className="col no-margin mr-1 ml-1">Product: {item.title}</div>
                                        <div className="col no-margin mr-1 ml-1">Price: {item.price} RON</div>
                                        <div className="col no-margin mr-1 ml-1">Published on: {" "}
                                            <Moment format="DD.MM.YYYY">{item.created_at}</Moment>
                                        </div>
                                        {!item.sold_out ?
                                            <div className="col no-margin mr-1 ml-1">Status: Available</div>
                                            :
                                            <div className="col no-margin mr-1 ml-1">Status: Unavailable</div>
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