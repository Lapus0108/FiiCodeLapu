import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

export default class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email:"",
            newPassword:"",
            confirmNewPassword:"",
            redirect: false,
            mesaj:""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    getHttpClient() {
        return axios.create({
            baseURL: process.env.REACT_APP_SERVER_APP_URL,
            timeout: 1000,
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
            }
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home'/>
        }
    }

    handleSubmit(){
        const new_password_details= {
            new_password:this.state.newPassword,
            email:this.state.email
        }
        if (this.state.newPassword === this.state.confirmNewPassword)
        {
            this.getHttpClient().post("DATABASE", new_password_details).then(response => {
                this.setState({mesaj: "Your new password is set, please log in!"})
                setTimeout(() => {
                    this.setState({redirect: true,})
                }, 2000);
            }).catch(error => {
                console.log("registration error", error);
            })     
        }
        else 
            this.setState({mesaj: "Password and password confirmation do not match"})
    }

    render() {
        return (
            <div className="forgot-password">
            <div className="forgot-password-title">Reset you password:</div>
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
                    name="newPassword"
                    placeholder="Enter your new password"
                    value={this.state.newPassword}
                    maxLength={16}
                    minLength={8}
                    onChange={this.handleChange}
                    required/>

                 <input
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm your new password"
                    value={this.state.confirmNewPassword}
                    maxLength={16}
                    minLength={8}
                    onChange={this.handleChange}
                    required/>

                <button type="submit" onClick={this.setRedirect}>Submit</button>
            </form>

            <div className="forgot_password_spatiu_erori">{this.state.mesaj}</div>
            </div>
        )
    }
}
