import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axiosRequest from "../../Utils/axios";

import background_auth from 'assets/images/Buton_lemn.png';

export default class Logout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home'/>
        }
    }

    componentDidMount() {
        axiosRequest.post("logout")
            .then(response => {
                console.log("res from logout", response);
                this.props.emptyCart()
                this.props.doLogout()
            }).catch(error => {
            console.log("logout error", error);
        });
        setTimeout(() => {
            this.setState({redirect: true,})
        }, 1000);
    }

    render() {
        return (
            <>
            {this.renderRedirect()}
            <div className="container_titlu_auth">
                <img src={background_auth} alt="login_img"/>
                <div className="titlu_pagina_auth">Logout</div>
            </div>
            <div className="logout_message">
                <h1>Logging you out...</h1>
            </div>
            </>
        )
    }
}
