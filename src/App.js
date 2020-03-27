import React, {Component} from 'react';
import './App.css';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import Dropdown from "./Componente/DropdownJudete";
import background from "../src/assets/img/Background-map-page-2.jpg";
import Sidebar from "./Componente/Sidebar";
import {Route, BrowserRouter, Switch, Router} from "react-router-dom";
import Registration from "./Componente/Registration";
import Cart from "./Componente/Cart";
import Navbar from "./Componente/Navbar2";
import ProductsPage from './Componente/ProductsPage';
import Login from './Componente/Login';
import HomeMenu from "./Componente/HomeMenu";
import AddProduct from "./Componente/Adauga_articol";
import SingleProduct from "./Componente/SingleProduct";
import Mailing from "./Componente/Mailing";
import AboutUs from "./Componente/AboutUs";
import Logout from "./Componente/Logout";
import axios from "axios";
import judete from "./assets/data/county.json"
import tags from "./assets/data/tags.json"
import { userLogin, userLogout } from "./Componente/login-actions/auth";
import PrivateRoute from "./Componente/login-actions/PrivateRoute";
import history from "./Componente/login-actions/history";
import { connect } from "react-redux";
import auth from "./Componente/login-reducers/auth";
import EditProduct from "./Componente/EditProduct";



//GOOGLE MAPS DEFAULT STYLE
const mapStyles = {
    width: '100%',
    height: '100%'
};

//AICI SE ADAUGA LABELURILE DIN BARA DE MENIURI
const items = [
    {name: 'home', label: 'Home'},
    {name: 'about_us', label: 'About us'},
    {name: 'profile', label: 'Profile'},
    // { name: 'myorders', label: 'My orders' },
    {name: 'add_product', label: 'Add product'},
    {name: 'products', label: 'Products'},
    {name: 'cart', label: 'Cart'},
    {
        name: 'mailing',
        label: 'Retro mailing',
        items: [
            {name: 'mailing', label: 'About letters'},
            {name: 'map', label: 'Send your letter!'},
        ]
    },
    {
        name: 'settings',
        label: 'Settings',
        items: [
            {name: 'account_settings', label: 'Account settings'},
            {name: 'notif_settings', label: 'Notification settings'},
        ],
    },
]

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.state = {
            user: {
                email: "",
                password: "",

                id: "",
                user_token: ""
            },
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            // oficii_post: [
            //  {lat: 47.257309, lng: 27.600330},
            //   {latitude: 47.257423, longitude: 27.600332},
            //   {latitude: 47.2052192687988, longitude: -121.988426208496},
            //   {latitude: 47.6307081, longitude: -122.1434325},
            //   {latitude: 47.3084488, longitude: -122.2140121},
            //   {latitude: 47.5524695, longitude: -122.0425407}
            // ]
        }
        
    }
    checkLoginStatus(){
        axios.get("Database",{withCredentials:true})
        .then(response=>{
            if(response.data.logged_in && this.state.isLoggedIn===false)
            this.setState({
                isLoggedIn:true,
                user: response.data.user
            })
            else if(!response.data.logged_in && this.state.isLoggedIn===true)
            this.setState({
                isLoggedIn: false,
                user:{}
            })

        })
        .catch(error=>{
            console.log("check login error", error);

        });
    }
    componentDidMount(){
        this.checkLoginStatus();
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

    // displayMarkers = () => {
    //   return this.state.oficii_post.map((item, index) => {
    //     return <Marker key={index} id={index} position={{
    //      lat: item.latitude,
    //      lng: item.longitude
    //    }}
    //    onClick={() => {console.log("You clicked me!")
    //   this.setState({activeMarker: true})}} />
    //   })
    // }

    render() {

        return (
            <div className="total">
                <div className="background_map_page">
                    <img src={background}></img>
                </div>


                <BrowserRouter history={history}>
                    <div className="App">
                        {this.props.isLoggedIn === true
                            ? <Sidebar items={items}/>
                            : ""}
                        <Switch>

                             {/* PAGINA REGISTER */}

                             <Route
                                path="/register"
                                component={props => (
                                    this.props.isLoggedIn === false ?
                                        <Registration
                                            judete={judete}
                                            isLoggedIn={this.state.isLoggedIn}
                                        />
                                        : ""
                                )}/>

                             {/* PAGINA LOGIN */}

                             <Route
                                path="/login"
                                component={props => (
                                    this.props.isLoggedIn === false ?
                                        <Login
                                            isLoggedIn={this.state.isLoggedIn}
                                            handleSuccessfulAuth={this.handleSuccessfulAuth}
                                            userLogin={userLogin}
                                            auth={auth}

                                        />
                                        : ""
                                )}/>
                            


                             {/* PAGINA LOGOUT */}

                             <Route path="/logout"
                                   component={props => (
                                       // this.state.isLoggedIn === true ?
                                           <Logout
                                               isLoggedIn={this.props.isLoggedIn}
                                               userLogout={userLogout}
                                               auth={auth}
                                           />
                                           // : ""
                                   )}
                            />

                             {/* PAGINA INCEPUT */}

                             <Route
                                path="/home"
                                component={props => (
                                    <HomeMenu
                                        isLoggedIn={this.props.isLoggedIn}
                                    />
                                )}
                            />

                            
                            {/* PAGINA PRODUSE */}

                            <Route exact path="/products" component={props => (
                                <>
                                <Navbar/>
                                <ProductsPage
                                    tags={tags}
                                    isLoggedIn={this.props.isLoggedIn}
                                    judete={judete}
                                />
                                </>)}
                            />

                            {/* PAGINA ADAUGA PRODUS */}

                            <Route
                                path="/add_product"
                                component={props => (
                                    <AddProduct
                                        judete={judete}
                                        tags={tags}
                                    />
                                )}/>

                              {/* PAGINA PRODUS INDIVIDUAL */}
                            <Route
                                path="/products/:product/edit"
                                component={EditProduct}/>
                              <Route
                                path="/products/:product"
                                component={SingleProduct}/>




                            {/* PAGINA CART */}

                            <Route
                                path="/cart"
                                component={props => (
                                    <>
                                    <Navbar/>
                                    <Cart/>

                                    </>
                                )}
                            />                  

                            {/* PAGINA SCRISORI */}

                            <Route
                                path="/mailing"
                                component={Mailing}/>

                            {/* PAGINA ABOUT US */}

                            <Route
                                path="/about_us"
                                component={AboutUs}/>

                           
                           {/* PAGINA HARTA GOOGLE */}
                            <Route
                                path="/map"
                                exact
                                component={props => (
                                    <>
                                    <div className="titlu_pagina_harta">Unde poti trimite cel mai rapid scrisoarea?
                                    </div>
                                    <div className="container_mapa_google">

                                        <Map
                                            google={this.props.google}
                                            zoom={14}
                                            style={mapStyles}
                                            initialCenter={{
                                                lat: 47.157309,
                                                lng: 27.600330
                                            }}

                                        >
                                            {/* {this.displayMarkers()} */}
                                            <Marker
                                                onClick={this.onMarkerClick}
                                                name={'Oficiul postal nr 1'}
                                            />
                                            <InfoWindow
                                                marker={this.state.activeMarker}
                                                visible={this.state.showingInfoWindow}
                                                onClose={this.onClose}
                                            >
                                                <div>
                                                    <h4>{this.state.selectedPlace.name}</h4>
                                                </div>
                                            </InfoWindow>
                                        </Map>
                                        <Dropdown/>
                                    </div>
                                    </>
                                )}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDNwR7Y528w5gyiSweT0IJ-awU2mPUEYhs'
// })(MapContainer);
const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
  });

export default connect(mapStateToProps, {userLogin, userLogout})(MapContainer);
  


//GOOGLE API KEY AIzaSyDcEaiQfgcMH2TowRayxYO2kgbEhbG1Aa4 (NU E BUN ASTA)
//GOOGLE API KEY WITH REGISTRATION AIzaSyDNwR7Y528w5gyiSweT0IJ-awU2mPUEYhs