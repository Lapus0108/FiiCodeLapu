import React from 'react';
import axios from "axios";
import background_auth from "../images/Buton_lemn.png";
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            loginErrors: "",
            redirect: false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products'/>
        }
    }

    componentDidMount() {
        axios.get(`DATABASE`)
            .then(res => {
                const user = res.data;
                this.setState({user});
            })
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
                    localStorage.setItem('user', JSON.stringify(response.data));
                    localStorage.setItem('isLoggedIn', true)
                }
            }).catch(error => {
            console.log("login error", error);
        })
        this.props.doLogin(user);
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


                    <button type="submit" onClick={this.setRedirect} >Login</button>
                </form>
            </div>
            </>
        );
    }
}

export default Login;