import React, { Component } from 'react';
import background_auth from "../images/Buton_lemn.png";

class HomeMenu extends React.Component {
    constructor(){
     super();
    
     this.state = {};
    };
render(){
    return(
        <>
    <div className="text_dr_sus">Designed and created for FiiCODE 2020</div>
    <div className="homepage_title">Piazeta</div>
    <div className="container_placi">
        <div className="container_buton1">
        <img src={background_auth}/>
        <div className="text_home_button">Create account</div>
        </div>
        <div className="container_buton2">
        <img src={background_auth}/>
        <div className="text_home_button">Login</div>
        </div>
        <div className="container_buton3">
        <img src={background_auth}/>
        <div className="text_home_button">About us</div>
        </div>
        <div className="container_buton4">
        <img src={background_auth}/>
        <div className="text_home_button">Mailing</div>
        </div>
    </div>
    </>
    );
}
}

export default HomeMenu;