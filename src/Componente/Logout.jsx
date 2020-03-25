import React from 'react';
import {Redirect} from "react-router-dom";
import background_auth from "../images/Buton_lemn.png";
import axios from "axios";

class Logout extends React.Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products'/>
        }
    }

    componentWillMount() {
        axios.post("http://localhost:8000/api/logout", "", {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).token
            }
        })
            .then(response => {
                console.log("res from logout", response);
                if (response.status = 200) {
                    const user = JSON.stringify({id: 0, name: "guest"});
                    localStorage.setItem('user', user);
                    localStorage.setItem('isLoggedIn', false)
                }
            }).catch(error => {
            console.log("logout error", error);
        })
    }

    render() {
        return (
            <>
            {this.renderRedirect()}
            <div className="container_titlu_auth">
                <img src={background_auth} alt="login_img"/>
                <div className="titlu_pagina_auth">Logout</div>
            </div>
            <div className="container_register">
                <h1>Logging you out</h1>
            </div>
            </>
        )
    }
}

export default Logout;