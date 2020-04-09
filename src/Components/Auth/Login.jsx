import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";
import {Link} from 'react-router-dom';
import LoginImage from '../../assets/images/buttons/Login.svg';

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
            <div className="container h-100">
                <div class="row h-100">
                    <div class="col-sm-3"/>
                    <div class="col-sm-6">
                        <div className="row justify-content-center h-25">
                            <img src={LoginImage} alt="login" class="title-image"/>
                        </div>
                        <div class="row justify-content-center h-75 mt-2">
                            <div class="col-sm-2"/>
                            <div class="col-sm-8">
                                <div class="container no-margin">
                                    <form onSubmit={this.handleSubmit}>
                                        <input
                                            className="input-main"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required/>

                                        <input
                                            className="input-main"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required/>

                                        <button class="input-button-main" type="submit" onClick={this.handleSubmit}>
                                            Login
                                        </button>
                                    </form>
                                    <Link to="/password/forgot">
                                        <div className="login_forgot_password">Forgot password?</div>
                                    </Link>
                                </div>
                            </div>
                            <div class="col-sm-2"/>
                        </div>
                    </div>
                    <div class="col-sm-3"/>
                </div>
            </div>
            </>
        );
    }
}
