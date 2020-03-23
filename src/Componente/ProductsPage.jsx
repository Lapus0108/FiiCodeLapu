import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from "./cartActions";
import simbolMesaj from "../images/pngwave.png";
import simbolCart from "../images/cart.png";
import axios from "axios";


class Home extends Component{
    constructor(){
        super();
    
    this.state={
    produs:[]     
    }
    }


    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    componentWillMount() {
        axios.get(`DATABASE`)
          .then(res => {
            const produs = res.data.data;
            this.setState({ produs });
          })
      }

    render(){
        let itemList = this.state.produs.sort(function(a, b) {     //FILTRU PRET CRESCATOR
            return a.price - b.price;
          }).map(item=>{
            return(
                <div className="card" key={item.id}>
                <div className="card-image">
                    <img src={item.img} alt={item.name}/>
                    <span className="card-title">{item.name}</span>
                    <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">
                        <img src={simbolCart} alt="Logo"/></i></span>
                </div>

                <div className="card-content">
                    <p>{item.description}</p>
                    <p><b>Pret: {item.price}{" "}RON</b></p>
                </div>
         </div>

    )
})

        return(
            <div className="container">
                <h3 className="center_title">Our items</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)