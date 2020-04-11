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
import ProfileContainer from "../Containers/ProfileContainer";
import ConfirmSaleContainer from "../Containers/Cart/ConfirmSaleContainer";
import CustomerChat from "../Components/CustomerChat";
import ResetPassword from '../Components/Auth/ResetPassword';
import ForgotPassword from '../Components/Auth/ForgotPassword';
import MediaQuery from "react-responsive";
import SidebarMobile from "../Components/SidebarMobile";
import background from "../assets/images/retro-wallpaper-1.jpg";
// import ConfirmOrders from "../Components/Cart/ConfirmOrders";


export default class Router extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="retro_app_total">

            <BrowserRouter>
                {this.props.isLoggedIn === true
                    ?
                    <MediaQuery  minDeviceWidth={850} >
                        <Sidebar />
                        <CustomerChat />
                    </MediaQuery>
                    : ""}
                <div className="App">
                    {this.props.isLoggedIn === true
                        ?
                        <MediaQuery  maxDeviceWidth={850} >
                            <SidebarMobile />
                           {/* <CustomerChat /> */}

                        </MediaQuery>


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

                        {/*/!* PAGINA INCEPUT *!/*/}
                        {/*<Route*/}
                            {/*path={process.env.PUBLIC_URL}*/}
                            {/*exact*/}
                            {/*component={HomeContainer}*/}
                        {/*/>*/}

                        <Route
                            path="/home"
                            exact
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

                        {/* PAGINA PROFIL */}
                        <PrivateRoute
                            path='/profile'
                            component={ProfileContainer}
                            isLoggedIn={this.props.isLoggedIn}
                        />

                        {/* PAGINA CONFIRM SALE */}
                        <PrivateRoute
                            path='/orders/:id'
                            component={ConfirmSaleContainer}
                            isLoggedIn={this.props.isLoggedIn}
                        />

                        {/* PAGINA RESET PASSWORD */}
                        <Route
                            path='/password/reset'
                            component={ResetPassword}

                        />

                        {/* PAGINA FORGOT PASSWORD */}
                        <Route
                            path='/password/forgot'
                            component={ForgotPassword}

                        />


                    </Switch>

                </div>
            </BrowserRouter>
            </div>
        )
    }
}
