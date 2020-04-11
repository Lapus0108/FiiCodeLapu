import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axiosRequest from "../../Utils/axios";
import judete from 'assets/data/county.json'
import CreateAccount from 'assets/images/buttons/CreateAccount.svg';
import default_picture from '../../assets/images/Icons/ProfileDefault.png';
import { store } from 'react-notifications-component';


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
            image: default_picture,
            // image:"",
            has_image: false

        };
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
    }

    handleChange=(event)=> {
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


    handleSubmit=(event)=> {
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
                store.addNotification({
                    title: "Welcome to Piazeta!",
                    message: "Your account has been created successfully!",
                    type: "success",
                    insert: "bottom",
                    container: "bottom-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 4000
                     }
                  });
                setTimeout(() => {
                    this.setState({redirect: true,})
                }, 2000);
            }).catch(error => {
                console.log("registration error", error);
            })
        }
        else store.addNotification({
            title: "Registration error",
            message: "Password and password confirmation do not match",
            type: "warning",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                 duration: 3000
                    }
            });
        event.preventDefault();
        console.log(this.state.image);

    }

    render() {
        return (
            <>
            {this.renderRedirect()}
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-sm-3"/>
                    <div class="col-sm-6">
                        <div className="row justify-content-center h-25">
                            <img src={CreateAccount} alt="create_account" className="title-image"/>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-sm-2"/>
                            <div class="col-sm-8">
                                <div class="container-fluid no-margin">
                                    <form onSubmit={this.handleSubmit} className="no-margin">
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

                                        <div className="container-fluid font-secondary small">
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

                                        <label className="font-secondary">Select county
                                            <select value={this.state.county} onChange={this.handleChange}
                                                    name="county" className="ml-2 input-main w-auto">
                                                {judete.map((item, key) => {
                                                    return (
                                                        <option value={item.id}
                                                                onChange={this.handleChange}>{item.name}</option>
                                                    )
                                                })}
                                            </select>
                                        </label>


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

                                        <button className="input-button-main" type="submit"
                                                onClick={this.setRedirect}>Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div class="col-sm-2"/>
                        </div>
                    </div>
                    <div class="col-sm-3 "/>
                </div>
            </div>
            </>
        );
    }
}