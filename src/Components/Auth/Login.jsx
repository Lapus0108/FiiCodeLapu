import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios";

import background_auth from "../../assets/images/Buton_lemn.png";

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            loginErrors: "",
            redirect: false,
            mesaj:"",


        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products'/>
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user, "user")

        axios.post("http://localhost:8000/api/login", user, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })                                    //AICI TREBUIE PUS LINKUL DE LA DATABASE CU USERII CREATI
            .then(response => {
                console.log("res from login", response);
                if (response.status = 200) {
                    this.setState({redirect:true})
                    this.props.doLogin(response.data)
                }
            }).catch(error => {
            console.log("login error", error);
            this.setState({mesaj:"Email and password does not match"});
        });
        event.preventDefault();
}


    render() {
        return (
            <>
            {this.renderRedirect()}
            <div className="container_titlu_auth">
                <img src={background_auth} alt="login_img"/>
                <div className="titlu_pagina_auth">Login</div>
            </div>
            <div className="container_register">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required/>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required/>


                    <button type="submit" onClick={this.handleSubmit} >Login</button>
                </form>
            </div>
            </>
        );
    }
}