import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";
import {Link} from 'react-router-dom';
import background_auth from 'assets/images/Buton_lemn.png';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            loginErrors: "",
            redirect: false,
            mesaj: "",


        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home'/>
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit(event) {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(user, "user");

        axiosRequest.post('login', user)
            .then(response => {
                console.log("res from login", response);
                if (response.status = 200) {
                    this.setState({redirect: true})
                    this.props.doLogin(response.data)
                }
            }).catch(error => {
            console.log("login error", error);
            this.setState({mesaj: "Email and password does not match"});
        });
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

                    {/*<Button type="submit" class="bp3-large" intent="primary" text="Login" onClick={this.handleSubmit} />*/}
                    <button type="submit" onClick={this.handleSubmit}>Login</button>
                </form>
                <Link to="/password/forgot">
                    <div className="login_forgot_password">Forgot password?</div>
                </Link>
            </div>
            </>
        );
    }
}
