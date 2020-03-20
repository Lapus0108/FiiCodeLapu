import React, { Component } from 'react';
import axios from "axios";
import background_auth from "../images/Buton_lemn.png";

class Login extends React.Component {
    constructor(){
     super();
    
     this.state = {
         email: "",
         password:"",
         loginErrors: ""
         
     };

     this.handleSubmit=this.handleSubmit.bind(this);
     this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        const {
            email,
            password
            }=this.state;

        axios.post("DATABASE", {                                    //AICI TREBUIE PUS LINKUL DE LA DATABASE CU USERII CREATI
            user:{
                email: email,
                password: password
            }
        
        },
        { withCredentials: true}
        ).then(response=>{
            console.log("res from login", response);
            if(response.data.logged_in===true){                    //AICI TREBUIE MODIFICAT IN FUNCTIE DE CUM PRIMESTI TU INFO
                this.props.handleSuccessfulAuth(response.data);
            }
        }).catch(error=>{
            console.log("login error", error);
        })
        event.preventDefault();
    }

render(){
    return(
        <>
        <div className="container_titlu_auth">
            <img src={background_auth}/>
        <div className="titlu_pagina_auth">Login </div>
        </div>
    <div className="container_register">
        <form onSubmit={this.handleSubmit}>
            <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            required />

            <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            required />


            <button type="submit">Login</button>
        </form>
    </div>
    </>
    );
}
}

export default Login;