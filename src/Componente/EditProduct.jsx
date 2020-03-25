import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import judete from '../assets/data/county.json';
import tags from '../assets/data/tags.json'

class AddArticles extends React.Component {
    constructor() {
        super();

        this.state = {
            product: {
                title: "",
                description: "",
                price: "",
                county: {
                    name: "",
                    id: "99"
                },
                negotiable: false,
                image: "",
                tag: {
                    name: "",
                    id: ""
                }
            },
            redirect: false,
            bifa2: false,

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const url_get = `http://localhost:8000/api/products/`;
        const id_get = this.props.match.params.product;
        axios.get(url_get + id_get, "", {
            headers: {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        })
            .then(res => {
                const product = res.data;
                this.setState({product: product});
            })

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

        console.log(this.state.county, "County");
        console.log(this.state.tag, "Tag")

        if (this.state.bifa2 === true && this.state.county !== "99") {

            const product = {
                title: this.state.name,
                description: this.state.description,
                price: this.state.price,
                negotiable: this.state.negotiable,
                county_id: this.state.county,
                seller_id: JSON.parse(localStorage.getItem('user')).id,
                // image_buna: this.setUploadedImgString(this.state.image)

            }

            console.log(product);

            axios.put("http://localhost:8000/api/products/" + this.props.match.params.product, product, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
                }
            })
                .then(response => {
                    console.log("registration res", response);
                }).catch(error => {
                console.log("registration error", error);
            })

            this.setState({
                redirect: true
            })
        } else {
            this.setState({redirect: false})
        }
    }


    render() {
        return (
            <>
            {this.renderRedirect()}
            <div className="title_addarticles">
                Editeaza-ti produsul:
            </div>
            <div className="container_add_product">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder={this.state.product.title}
                        value={this.state.product.title}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder={this.state.product.description}
                        value={this.state.product.description}
                        onChange={this.handleChange}
                        required/>


                    <label>Select category
                        <select value={this.state.product.tag} onChange={this.handleChange} name="tag">
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
                        placeholder={this.state.product.price}
                        value={this.state.product.price}
                        onChange={event => this.setState({price: event.target.value.replace(/\D/, '')})}
                        required/>


                    <label>Select county
                        <select value={this.state.product.county} onChange={this.handleChange} name="county">
                            {judete.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.name}</option>
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
                                checked={this.state.product.negotiable}
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


                    <button type="submit" onClick={this.handleSubmit}>Submit changes</button>

                </form>
            </div>
            </>
        );
    }
}

export default AddArticles;