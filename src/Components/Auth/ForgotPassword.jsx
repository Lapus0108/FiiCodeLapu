import React, {Component} from 'react';
// import axiosRequest from '../../Utils/axios';

export default class ForgotPassword extends Component {
    constructor() {
        super();
        this.state = {
            email:"",
            mesaj_forgot_password:"",
            button_clicks: 0
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        // axiosRequest.post("/password/email", {email:this.state.email});
        this.setState({
            mesaj_forgot_password:"Instructions have been sent to this email address in order to reset your password!",
            button_clicks:this.state.button_clicks+1
        })
        event.preventDefault();
    }

    render() {
        console.log(this.state.button_clicks)
        return (
            <div className="reset-password">
                <div className="reset_password_title">Forgot password?</div>
                <div className="reset_password_text">In order to get instructions to reset your password, please enter your email address associated with your Piazeta account</div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email:"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit" onClick={this.handleSubmit} >Send instructions</button>
                </form>
                {this.state.button_clicks<=1 ?
                <div className="reset_password_mesaj">{this.state.mesaj_forgot_password}</div>
                :
                <div className="reset_password_mesaj">Instructions already sent!</div>}
            </div>
        )
    }
}