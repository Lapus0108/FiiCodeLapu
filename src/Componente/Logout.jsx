import React from 'react';
import {Redirect} from "react-router-dom";
import background_auth from "../images/Buton_lemn.png";
import axios from "axios";
import { connect } from 'react-redux'
import { userLogout } from "./login-actions/auth.js"

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

    componentDidMount() {
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
                }
            }).catch(error => {
            console.log("logout error", error);
        });
        this.props.doLogout();
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        doLogout: () => {
            dispatch(userLogout())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)