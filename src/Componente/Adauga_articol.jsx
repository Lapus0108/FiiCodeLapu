import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const categories = [
    {
        id: "1",
        name: "",
    },
    {
        id: "2",
        name: "Food",
    },
    {
        id: "3",
        name: "Homemade",
    },
    {
        id: "4",
        name: "Clothing",
    },
    {
        id: "5",
        name: "Furniture",
    },
    {
        id: "6",
        name: "None of the above"
    }

]

const judete = [
    {
        id: 1,
        nume: "",
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
    },
    {
        id: 4,
        nume: "Iasi",
        lat_centru: 44,
        long_centru: 55
    }
]

class AddArticles extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            price: "",
            county: "",
            negotiable: false,
            bifa2: false,
            image: "",
            tag: {
                name: "",
                id: ""
            },
            redirect: false,


        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/products'/>
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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

    setUploadedImgString = (img64Base) => {
        this.setState({uploadedImgString: img64Base});
    }


    handleSubmit(event) {
        event.preventDefault();

        const product = {
            title: this.state.name,
            description: this.state.description,
            price: this.state.price,
            negotiable: this.state.negotiable,
            seller_id: "1",
            image_buna: this.setUploadedImgString(this.state.image)

        }

        axios.post("http://localhost:8000/api/products", product)
            .then(response => {
                console.log("registration res", response);
            }).catch(error => {
            console.log("registration error", error);
        })
        console.log(this.state.tag)
        console.log(this.state.county)

        this.setState({
            redirect: true
        })

    }


    render() {
        return (
            <>
            {this.renderRedirect()}
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
                            {categories.map((item, key) => {
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


                    <label>Select county
                        <select value={this.state.county} onChange={this.handleChange} name="county">
                            {judete.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.nume}</option>
                                )
                            })}
                        </select>
                    </label>

                    <div className="input_image">
                        <input type="file" onChange={this.onImageChange} className="filetype" id="product_image"/>
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
                    )


                </form>
            </div>
            </>
        );
    }
}

export default AddArticles;