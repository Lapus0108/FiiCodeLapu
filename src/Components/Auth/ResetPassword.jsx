import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import axiosRequest from "axios";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            newPassword:"",
            confirmNewPassword:"",
            redirect: false,
            mesaj:"",
            token: ""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount(){
        this.setState({token: this.props.location.pathname.slice(16), email: this.props.location.search.slice(7).replace("%40", "@")})
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/home'/>
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const new_password_details= {
            password:this.state.newPassword,
            email:this.state.email,
            token: this.state.token
        }
        if (this.state.newPassword === this.state.confirmNewPassword)
        {
            axiosRequest.post("password/reset", new_password_details).then(response => {
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
