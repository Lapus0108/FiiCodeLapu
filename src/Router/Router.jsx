import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";

import Sidebar from "../Components/Sidebar";
import Registration from "../Components/Auth/Registration";
import Mailing from "../Components/Mailing";
import AboutUs from "../Components/AboutUs";
import Map from "../Components/Map/Map"
import LoginContainer from "../Containers/Auth/LoginContainer";
import LogoutContainer from "../Containers/Auth/LogoutContainer";
import HomeContainer from "../Containers/HomeContainer";
import ProductsContainer from "../Containers/Products/ProductsContainer";
import ProductsAddContainer from "../Containers/Products/ProductsAddContainer";
import ProductsSingleContainer from "../Containers/Products/ProductsSingleContainer";
import CartContainer from "../Containers/Cart/CartContainer";

export default class Router extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    {this.props.isLoggedIn === true
                        ? <Sidebar />
                        : ""}
                    <Switch>

                        {/* PAGINA REGISTER */}
                        <Route
                            path="/register"
                            component={Registration}
                            isLoggedIn={!this.props.isLoggedIn}
                        />

                        {/* PAGINA LOGIN */}
                        <Route
                            path="/login"
                            component={LoginContainer}/>


                        {/* PAGINA LOGOUT */}
                        <PrivateRoute
                            path="/logout"
                            component={LogoutContainer}
                            isLoggedIn={this.props.isLoggedIn}
                        />

                        {/* PAGINA INCEPUT */}
                        <Route
                            path="/home"
                            component={HomeContainer}
                        />

                        {/* PAGINA PRODUSE */}
                        <Route
                            exact
                            path="/products"
                            component={ProductsContainer}
                            
                           
                        />

                        {/* PAGINA ADAUGA PRODUS */}
                        <PrivateRoute
                            path="/products/create"
                            component={ProductsAddContainer}
                            isLoggedIn={this.props.isLoggedIn}
                        />

                        {/* PAGINA PRODUS INDIVIDUAL */}
                        <PrivateRoute
                            path="/products/:product"
                            component={ProductsSingleContainer}
                            isLoggedIn={this.props.isLoggedIn}
                        />

                        {/* PAGINA CART */}
                        <PrivateRoute
                            path="/cart"
                            component={CartContainer}
                            isLoggedIn={this.props.isLoggedIn}
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
                        <Route path='/map' 
                               component={Map} 
                        />
                            
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
