import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from './DropdownJudete';

class AddArticles extends React.Component {
    constructor(){
     super();
    
     this.state = {
         name:"",
         description:"",
         price:"",
         county:"",
         negociabil: false,
         bifa2: false,
         image:"",
         tag:""
         
         judete:[
          {
            id:1,
            nume: "Iasi",
            lat_centru: 44,
            long_centru:55
          },
          {
            id:2,
            nume: "Bucuresti",
            lat_centru: 42,
            long_centru:34
          },
          { id:3,
            nume: "Timisoara",
            lat_centru:33,
            long_centru:41
          }
         ]
        
     };
     this.handleSubmit=this.handleSubmit.bind(this);
     this.handleChange=this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChange1= () => {
        this.setState(initialState => ({
          
          negociabil: !initialState.negociabil
        }));
      }

    onChange2= () => {
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
        }
      }

      handleSubmit(event) {
        const {
            name,
            description,
            price,
            county,
            negociabil:negociabil,
            bifa2,
            image
            
        }=this.state;
        axios.post("DATABASE", { 
            user:{
                name:name,
                description:description,
                price:price,
                county:county,
                negociabil:negociabil,
                bifa2:bifa2,
                image:image
                }
        
        },
        { withCredentials: true}
        ).then(response=>{
            console.log("registration res", response);
        }).catch(error=>{
            console.log("registration error", error);
        })
        event.preventDefault();
    }

render(){
    return(
        <>
    <div className="title_addarticles">
        Adauga un produs nou pe piata:
    </div>
    <div className="container_add_product">
        <form onSubmit={this.handleSubmit}>
            <input 
            type="text" 
            name="name" 
            placeholder="Product name:" 
            value={this.state.name} 
            onChange={this.handleChange} 
            required />

            <input 
            type="text" 
            name="description" 
            placeholder="Describe your product:" 
            value={this.state.description} 
            onChange={this.handleChange} 
            required />

           
            <input 
            type="text" 
            name="price" 
            placeholder="Price(RON):" 
            value={this.state.price} 
            onChange={event => this.setState({price: event.target.value.replace(/\D/,'')})}
            required />


            <label>Selecteaza judetul
              <select value={this.state.county} onChange={this.handleChange} name="county">
                {this.state.judete.map((item,key)=>{
                  return(
                    <option value={item.nume} onChange={this.handleChange}>{item.nume}</option>
                    )
                })}
              </select>
            </label>
            
            <div className="input_image">
            <input type="file" onChange={this.onImageChange} className="filetype" id="product_image" />
            {/* <img id="target" src={this.state.image}/> */} 
            </div>
            
            <div className="add_product_bifa ">
              {/* trebuie pus link */}
              <label className="containerTermeni">
                
                <input
                  onChange={this.onChange1}
                  type="checkbox"
                  checked={this.state.negociabil}
                />
                I would like to receive negotiation offers
                <span className="checkmarkTermenisiConditii" />
              </label>
            </div>

            <div className="add_product_bifa ">
              {/* trebuie pus link */}
              <label className="containerTermeni">
                
                <input
                  onChange={this.onChange2}
                  type="checkbox"
                  checked={this.state.bifa2}
                />
                I assure that the declared data are real
                <span className="checkmarkTermenisiConditii" />
              </label>
            </div>

        <button type="submit">Add you product</button>

        </form>
        </div>
    </>
    );
}
}

export default AddArticles;