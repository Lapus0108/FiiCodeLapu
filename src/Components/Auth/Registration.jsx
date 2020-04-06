import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";

import {FormGroup, InputGroup, Card, Elevation, FileInput} from '@blueprintjs/core'

import judete from 'assets/data/county.json'
import CreateAccount from 'assets/images/buttons/CreateAccount.svg';
import default_picture from '../../assets/images/Icons/ProfileDefault.png';


export default class Registration extends Component {
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
            phone_number: "",
            address: "",
            age: "",
            redirect: false,
            mesaj: "",
            image: default_picture,
            // image:"",
            has_image: false

        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
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

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({has_image: true});
        }

    }


    handleSubmit(event) {
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.username,
            age: this.state.age,
            address: this.state.address,
            county_id: this.state.county,
            image: this.state.image,
            phone: this.state.phone_number
        }

        if (this.state.password_confirmation === this.state.password) {
            axiosRequest.post("/register", user).then(response => {
                console.log("registration res", response);
                this.setState({mesaj: "Registration successful, please log in!"})
                setTimeout(() => {
                    this.setState({redirect: true,})
                }, 2000);
            }).catch(error => {
                console.log("registration error", error);
            })
        }
        else this.setState({mesaj: "Password and password confirmation do not match"})
        event.preventDefault();
        console.log(this.state.image);

    }

    render() {
        return (
            <>
            {this.renderRedirect()}
            <div class="container h-100">
                <div class="row">
                    <div class="col-sm-3"/>
                    <div class="col-sm-6">
                        <img src={CreateAccount} alt="create_account" className="title-image"/>
                        <div class="row justify-content-center">
                            <div class="col-sm-2"/>
                            <div class="col-sm-8">
                                    <Card interactive={true} elevation={Elevation.TWO} className="no-margin no-background">
                                        <div class="container">
                                        <h1 className="font-main">Register Now</h1>
                                        <form onSubmit={this.handleSubmit}>
                                            <input
                                                className="input-main"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                                required/>

                                            <input
                                                className="input-main"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                maxLength={16}
                                                minLength={8}
                                                onChange={this.handleChange}
                                                required/>

                                            <input
                                                className="input-main"
                                                type="password"
                                                name="password_confirmation"
                                                placeholder="Confirm password"
                                                value={this.state.password_confirmation}
                                                maxLength={16}
                                                minLength={8}
                                                onChange={this.handleChange}
                                                required/>


                                            <input
                                                className="input-main"
                                                type="text"
                                                name="username"
                                                placeholder="Username"
                                                value={this.state.username}
                                                maxLength={12}
                                                onChange={this.handleChange}
                                                required/>

                                            <input
                                                className="input-main"
                                                type="text"
                                                name="phone_number"
                                                placeholder="Phone number"
                                                value={this.state.phone_number}
                                                maxLength={10}
                                                onChange={event => this.setState({phone_number: event.target.value.replace(/\D/, '')})}
                                                required/>

                                            <div className="font-main justify-content-center align-content-center">
                                                <input
                                                    type="file"
                                                    onChange={this.onImageChange}
                                                    className="m-1 align-self-center"
                                                    id="user_image"/>
                                            </div>

                                            <input
                                                className="input-main"
                                                type="text"
                                                name="age"
                                                placeholder="Age"
                                                value={this.state.age}
                                                maxLength={2}
                                                onChange={event => this.setState({age: event.target.value.replace(/\D/, '')})}
                                                required/>

                                            {/*<label className="font-main">Select county*/}
                                                {/*<select value={this.state.county} onChange={this.handleChange}*/}
                                                        {/*name="county" className="ml-2 input-main">*/}
                                                    {/*{judete.map((item, key) => {*/}
                                                        {/*return (*/}
                                                            {/*<option value={item.id}*/}
                                                                    {/*onChange={this.handleChange}>{item.name}</option>*/}
                                                        {/*)*/}
                                                    {/*})}*/}
                                                {/*</select>*/}
                                            {/*</label>*/}


                                            <input
                                                className="input-main"
                                                type="text"
                                                name="address"
                                                placeholder="Full address"
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                required/>


                                            <div className="politici marginBottomInputs">
                                                <label className="containerTermeni">
                                                    <input
                                                        required
                                                        onChange={this.onChange1}
                                                        type="checkbox"
                                                        checked={this.state.bifa1}
                                                        className="mr-1"
                                                    />
                                                    I agree with the terms and conditions
                                                    <span className="checkmarkTermenisiConditii"/>
                                                </label>
                                            </div>

                                            <div className="politici marginBottomInputs">
                                                <label className="containerPolitici">
                                                    <input
                                                        required
                                                        onChange={this.onChange2}
                                                        checked={this.state.bifa2}
                                                        type="checkbox"
                                                        className="mr-1"
                                                    />
                                                        I agree with the privacy policies
                                                    <span className="checkmarkPolitici"/>
                                                </label>
                                            </div>

                                            <button className="input-button-main" type="submit" onClick={this.setRedirect}>Submit</button>
                                        </form>
                                        <div className="register_spatiu_erori">{this.state.mesaj}</div>
                                        </div>
                                    </Card>
                            </div>
                            <div class="col-sm-2"/>
                        </div>
                    </div>
                    <div class="col-sm-3"/>
                </div>
            </div>
            </>
        );
    }
}