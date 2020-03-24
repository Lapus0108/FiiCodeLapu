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

        // axios.post("http://localhost:8000/api/logout", "", {
        //     headers: {
        //         'Content-Type': "application/json",
        //         'Accept': "application/json",
        //         'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOGZmNDRkZjQ0ZDE1MzhkMjRmNWYwYjQ1YTI0ZjhiZGVkM2YwYjEwOTYzZGI5M2YxODRlMmI1ZDM3NDE1MWNjNzZiZGE3ODg1MDBmYjdjY2QiLCJpYXQiOjE1ODUwNDY5MTUsIm5iZiI6MTU4NTA0NjkxNSwiZXhwIjoxNjE2NTgyOTE1LCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.hy9PswQCwh1Dv8KgLCFsi8YEtXT0PMNIg1K0KrpVY3JCERPp8YEXsrEqfJf0jIPngcFsHpgJMV2FztfE-S0pyM0QPLwq2rK02Hro7LqhlmNa4CPyoVGC8d499yE2XOdYzx1087TCuqPO3kvv_BSHBHjyk1wpfH9mOndXkRuinfgPReGa13GN-5tKdyLPkFXcJcI-6sHdevo3zflbNvCf3PHy4HvRiAsxUpRE-XNRBZKn2-Cfl38I3GABENuG8N3s1d43QbgBbzY1gDOACTzS_9WZTa0y2QqClfPcxlGGMAMbxMxupVdwbk77msvroJv-dZbRQco52DzgdMvueVFa7cJ7eMrBeEghUk2-nNFNcydTPacGCAMt40I1C62IWx_3qPCLHjrGSHiqfxHGq6cdNe8O7115Sby-6m_Oxdk-haR1Sy-a59FMKDrxGYvBF7qcr6iXmrG6TCh8qFoaU3FLRooS0-p346AaoJOZaZG1PUgrq5hIhtiAuGAFw2q84vYt3CY9UQ5Y_hqEISxrRu0JCnMAdPMu7XNMXQVlqyU6xnB1yE2G8b891mIGtP5NLr_CUEuHxc7gvvwKJqSFqv5EIeyW5C0GRGNgRjkIk0B3W6Gz2A-gvLbD7D8NJbYlXEqM89jObeKmpMsR2w41PQX4wDPo9zMjBykeXJiww-oSkpc"}})                                    //AICI TREBUIE PUS LINKUL DE LA DATABASE CU USERII CREATI
        //     .then(response => {
        //         console.log("res from logout", response);
        //         // if (response.data.logged_in === true) {                    //AICI TREBUIE MODIFICAT IN FUNCTIE DE CUM PRIMESTI TU INFO
        //         //     this.props.handleSuccessfulAuth(response.data);
        //         // }
        //     }).catch(error => {
        //     console.log("login error", error);
        // })

        axios.post("http://localhost:8000/api/login", user)                                    //AICI TREBUIE PUS LINKUL DE LA DATABASE CU USERII CREATI
            .then(response => {
                console.log("res from login", response);
                if (response.status = 200) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                // if (response.data.logged_in === true) {                    //AICI TREBUIE MODIFICAT IN FUNCTIE DE CUM PRIMESTI TU INFO
                //     this.props.handleSuccessfulAuth(response.data);
                // }
            }).catch(error => {
            console.log("login error", error);
        })
        event.preventDefault();
        this.setState({
            redirect: true
        })
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


                    <button type="submit" onClick={this.setRedirect}>Login</button>
                </form>
            </div>
            </>
        );
    }
}

export default Login;