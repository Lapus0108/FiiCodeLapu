import React from 'react';
import axios from "axios";
import background_auth from "../images/Buton_lemn.png";
import {Redirect} from 'react-router-dom';
import { userLogin }from './login-actions/auth.js'
import { connect } from 'react-redux'

class Login extends React.Component {
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
            return <Redirect to='/home'/>
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
        })                                   
            .then(response => {
                
                console.log("res from login", response);
                if (response.status = 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.setState({redirect:true})
                    this.props.doLogin()    
                }
                
            }).catch(error => {
            console.log("login error", error);
            this.setState({mesaj:"Email and password does not match"});
        })
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
                <div className="login_spatiu_erori">{this.state.mesaj}</div>
            </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: () => {
            dispatch(userLogin())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
