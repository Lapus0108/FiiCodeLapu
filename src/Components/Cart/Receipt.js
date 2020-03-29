import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axios from "axios";

export default class Receipt extends Component {
    constructor(props){
        super();
        this.state={
            redirect: false,
            mesaj:"",
            sale:{
                seller_id:"",
                buyer_id:"",
                quantity:"",
                price:""
            }
        }  
    }
    

   
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/Products'/>
        }
    }
    

    handleSubmit = event => {
            event.preventDefault();
            axios.post(`Database`, this.props.items )
              .then(res => {
                console.log(res);
                console.log(res.data);
              })
              .catch(error => {
                console.log("registration error", error);
            })
              this.setState({redirect:true})
          }

        
    render() {
        console.log(this.props.items)
        return (
            <>
            <div className="container">
                <div className="collection">
                    <li className="collection-item"><b>Total: {this.props.total} RON</b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn" onClick={this.handleSubmit}>Submit your order</button>
                </div>
            </div>
            </>
        )
    }
}
