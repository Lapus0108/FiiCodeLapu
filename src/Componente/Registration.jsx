import React from 'react';
import axios from "axios";
import background_auth from "../images/Buton_lemn.png";
import {Redirect} from 'react-router-dom';


class Registration extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
            bifa1: false,
            bifa2: false,
            county: "",
            username: "",
            address: "",
            age: "",
            redirect: false,
            mesaj:""

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    renderRedirect=() => {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
    }
   
        
   

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChange1 = () => {
        this.setState(initialState => ({

            bifa1: !initialState.bifa1
        }));
    }

    onChange2 = () => {
        this.setState(initialState => ({
            bifa2: !initialState.bifa2,

        }));
    }


    handleSubmit(event) {
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.username,
            age: this.state.age,
            address: this.state.address,
            county_id: this.state.county,
        }
    if(this.state.password_confirmation===this.state.password){
        axios.post("http://localhost:8000/api/register", user, {
                headers: {}
            }
        ).then(response => {
            
            console.log("registration res", response);
            this.setState({mesaj: "Registration successful, please log in!"})
            this.timer = setTimeout(() => {this.setState({redirect: true, })
           }, 2000);
        
        
          
        }).catch(error => {
            console.log("registration error", error);
        })
    }
    else this.setState({mesaj: "Password and password confirmation do not match"})
        event.preventDefault();       
    }
   render() {
        return (
            <>
            {this.renderRedirect()}
            <div className="container_titlu_auth">
                <img src={background_auth} alt="register_lemn"/>
                <div className="titlu_pagina_auth">Register now</div>
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
                        maxLength={16}
                        minLength={8}
                        onChange={this.handleChange}
                        required/>

                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={this.state.password_confirmation}
                        maxLength={16}
                        minLength={8}
                        onChange={this.handleChange}
                        required/>


                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        maxLength={12}
                        onChange={this.handleChange}
                        required/>

                    <input
                        type="text"
                        name="age"
                        placeholder="Age"
                        value={this.state.age}
                        maxLength={2}
                        onChange={event => this.setState({age: event.target.value.replace(/\D/, '')})}
                        required/>

                    <label>Select county
                        <select value={this.state.county} onChange={this.handleChange} name="county">
                            {this.props.judete.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.name}</option>
                                )
                            })}
                        </select>
                    </label>


                    <input
                        type="text"
                        name="address"
                        placeholder="Full address"
                        value={this.state.address}
                        onChange={this.handleChange}
                        required/>


                    <div className="politici marginBottomInputs">
                        {/* trebuie pus link */}
                        <label className="containerTermeni">

                            <input
                            required
                                onChange={this.onChange1}
                                type="checkbox"
                                checked={this.state.bifa1}
                            />
                            Sunt de acord cu termenii și condițiile date
                            <span className="checkmarkTermenisiConditii"/>
                        </label>
                    </div>

                    <div className="politici marginBottomInputs">
                        <label className="containerPolitici">
                            {/* trebuie pus link */}

                            <input
                            required
                                onChange={this.onChange2}
                                checked={this.state.bifa2}
                                type="checkbox"
                            />
                            Sunt de acord cu politicile de confidențialitate
                            <span className="checkmarkPolitici"/>
                        </label>
                    </div>

                    <button type="submit" onClick={this.setRedirect}>Register</button>
                </form>
                <div className="register_spatiu_erori">{this.state.mesaj}</div>
            </div>
            </>
        );
    }
}

export default Registration;