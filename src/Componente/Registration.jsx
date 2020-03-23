import React, {Component} from 'react';
import axios from "axios";
import background_auth from "../images/Buton_lemn.png";

const judete = [
    {
        id: 1,
        nume: "Iasi",
        lat_centru: 44,
        long_centru: 55
    },
    {
        id: 2,
        nume: "Bucuresti",
        lat_centru: 42,
        long_centru: 34
    },
    {
        id: 3,
        nume: "Timisoara",
        lat_centru: 33,
        long_centru: 41
    }
]

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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            jud_id: this.state.county,
            address: this.state.address
        }

        axios.post("http://localhost:8000/api/register", user
        ).then(response => {
            console.log("registration res", response);
        }).catch(error => {
            console.log("registration error", error);
        })
        event.preventDefault();
    }

    render() {
        return (
            <>
            <div className="container_titlu_auth">
                <img src={background_auth}/>
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
                        onChange={this.handleChange}
                        required/>

                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                        value={this.state.password_confirmation}
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

                    <label>Selecteaza judetul
                        <select value={this.state.county} onChange={this.handleChange} name="county">
                            {judete.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.nume}</option>
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
                                onChange={this.onChange2}
                                checked={this.state.bifa2}
                                type="checkbox"
                            />
                            Sunt de acord cu politicile de confidențialitate
                            <span className="checkmarkPolitici"/>
                        </label>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
            </>
        );
    }
}

export default Registration;