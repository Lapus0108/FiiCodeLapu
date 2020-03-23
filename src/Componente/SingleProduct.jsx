import React, { Component } from 'react';
import contact_button from "../images/pngwave.png";

const items=[
    {
    id:1,
    title:'Vaza veche',
    desc: "Ziua 3 fara pariuri: am pus 100 de lei pe propriul caine", 
    price:110,
    img:"",
    seller_name:"Danutzz",
    negociabil:true,
    exchangeable:true
    }
]
console.log(items);
class SingleProduct extends React.Component {
    constructor(){
     super();
     this.state={}
    }

    

    render(){

        let ItemPage= items.map(item=>{
            return(
                <div className="sgproduct_container">
                <div className="sgproduct_titleart">Selected article: {item.title}</div>
                <div className="sgproduct_title">Price: {item.price} RON</div>
                <div className="sgproduct_title">Sold by: {item.seller_name}</div>
                {item.negociabil===true ? <div className="sgproduct_conditionals">! Product is negotiable</div> : "" }
                {item.exchangeable===true ? <div className="sgproduct_conditionals">! Product(s) in exchange may be accepted by the seller</div> : "" }
                <div className="sgproduct_title">Description: {item.desc}</div>
                <div className="sgproduct_contact_button">
                    <div className="sgproduct_button_text">Contact seller:</div>
                    <img src={contact_button} alt="contact_button"></img>
                </div>
                </div>
            )
        })

        return(
            <div>{ItemPage}</div>
              )

        
        
    }

}
    

    export default SingleProduct;