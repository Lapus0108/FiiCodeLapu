import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import judete from 'assets/data/county.json';
import tags from 'assets/data/tags.json';
import tag_animals from '../../assets/images/Icons/Tags/Animals.png';
import tag_books from '../../assets/images/Icons/Tags/Books.png';
import tag_food from '../../assets/images/Icons/Tags/Food.png';
import tag_homemade from '../../assets/images/Icons/Tags/Homemade.png';
import tag_clothing from '../../assets/images/Icons/Tags/Clothing.png';
import tag_furniture from '../../assets/images/Icons/Tags/Furniture.png';
import tag_cars from '../../assets/images/Icons/Tags/Cars.png';
import tag_tools from '../../assets/images/Icons/Tags/Tools.png';
import tag_jewelry from '../../assets/images/Icons/Tags/Jewelry.png';
import tag_other from '../../assets/images/Icons/Tags/Other.png';

export default class ProductsAdd extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            price: "",
            county: {
                name: "",
                id: "99"
            },
            negotiable: false,
            bifa2: false,
            image: "Not set",
            tag: {
                name: "",
                id: ""
            },
            redirect: false,
            has_photo:false,
            max_quantity:1
            


        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getHttpClient() {
        return axios.create({
            baseURL: process.env.REACT_APP_SERVER_APP_URL,
            timeout: 1000,
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': "Bearer " + this.props.user.token
            }
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products'/>
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
        
    }

    onChange1 = () => {
        this.setState(initialState => ({

            negotiable: !initialState.negotiable
        }));
    }

    onChange2 = () => {
        this.setState(initialState => ({
            bifa2: !initialState.bifa2,

        }));
        if(this.state.image==="Not set") {
            if(this.state.tag==="1") this.setState({image: tag_animals})
            if(this.state.tag==="2") this.setState({image: tag_books})
            if(this.state.tag==="3") this.setState({image: tag_food})
            if(this.state.tag==="4") this.setState({image: tag_homemade})
            if(this.state.tag==="5") this.setState({image: tag_clothing})
            if(this.state.tag==="6") this.setState({image: tag_furniture})
            if(this.state.tag==="7") this.setState({image: tag_cars})
            if(this.state.tag==="8") this.setState({image: tag_tools})
            if(this.state.tag==="9") this.setState({image: tag_jewelry})
            if(this.state.tag==="10") this.setState({image: tag_other})
        }
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({has_photo:true});
       
        }
    }




    handleSubmit(event) {
        event.preventDefault();
        
        
             const product = {
            title: this.state.name,
            description: this.state.description,
            price: this.state.price,
            negotiable: this.state.negotiable,
            county_id: this.state.county,
            seller_id: this.props.user.id,
            image: this.state.image,
            tags: this.state.tag,
            max_quantity:this.state.max_quantity
        }

        if (this.state.bifa2 === true && this.state.county !== "99") {
            console.log(product);

            this.getHttpClient().post("products", product)
                .then(response => {
                    console.log("creation res", response);
                    this.setState({
                        redirect: true
                    })
                }).catch(error => {
                console.log("creation error", error);
            })
        } else {
            this.setState({redirect: false})
        }
        console.log(this.state.image);
        console.log(this.state.has_photo);
    }
    

    render() {
        return (
            <>
            {this.renderRedirect()}
            <div className="title_addarticles">
                Add a new product on our market:
            </div>
            <div className="container_add_product">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product name:"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required/>

                    <input
                        type="text"
                        name="description"
                        placeholder="Describe your product:"
                        value={this.state.description}
                        onChange={this.handleChange}
                        required/>


                    <label>Select category
                        <select value={this.state.tag.name} onChange={this.handleChange} name="tag">
                            {tags.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.name}</option>
                                )
                            })}
                        </select>
                    </label>

                
                    <input
                        type="text"
                        name="price"
                        placeholder="Price(RON):"
                        value={this.state.price}
                        onChange={event => this.setState({price: event.target.value.replace(/\D/, '')})}
                        required/>
                    
                    <label>Select quantity
                        <select value={this.state.max_quantity} onChange={this.handleChange} name="max_quantity">
                                <option value="1" onChange={this.handleChange}>1</option>
                                <option value="2" onChange={this.handleChange}>2</option>
                                <option value="3" onChange={this.handleChange}>3</option>
                                <option value="4" onChange={this.handleChange}>4</option>
                                <option value="5" onChange={this.handleChange}>5</option>
                                <option value="6" onChange={this.handleChange}>6</option>
                                <option value="7" onChange={this.handleChange}>7</option>
                                <option value="8" onChange={this.handleChange}>8</option>
                                <option value="9" onChange={this.handleChange}>9</option>
                                <option value="10" onChange={this.handleChange}>10</option>
                            
                            
                        </select>
                    </label>


                    <label>Select county
                        <select value={this.state.county.name} onChange={this.handleChange} name="county">
                            {judete.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.name}</option>
                                )
                            })}
                        </select>
                    </label>

                    <div className="input_image">
                        <input type="file" onChange={this.onImageChange}  className="filetype" id="product_image"/>
                        {/* <img id="target" src={this.state.image}/> */}
                    </div>

                    <div className="add_product_bifa ">
                        {/* trebuie pus link */}
                        <label className="containerTermeni">

                            <input
                                onChange={this.onChange1}
                                type="checkbox"
                                checked={this.state.negotiable}
                            />
                            I would like to receive negotiation offers
                            <span className="checkmarkTermenisiConditii"/>
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
                            <span className="checkmarkTermenisiConditii"/>
                        </label>
                    </div>


                    <button type="submit" onClick={this.handleSubmit}>Add you product</button>

                </form>
            </div>
            </>
        );
    }
}