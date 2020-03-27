import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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

        console.log(this.state.county, "County");
        console.log(this.state.tag, "Tag")

        if (this.state.bifa2 === true && this.state.county !== "99") {



            const product = {
                title: this.state.name,
                description: this.state.description,
                price: this.state.price,
                negotiable: this.state.negotiable,
                county_id: this.state.county,
                seller_id: 2,
                file: this.state.image

            }

            console.log(product);

            axios.post("http://localhost:8000/api/products", product, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2ViNmI4NWI0ZmNlMDM0Y2RkZTMzZjA4MDVhYjUwYTI0ZjIxMWE0ZTgzYWI2YWVjOTkzYmQxYmNiNzU2OGY0YWIzNDM4Mjk1Y2YxM2U2OTciLCJpYXQiOjE1ODUyNDE4ODYsIm5iZiI6MTU4NTI0MTg4NiwiZXhwIjoxNjE2Nzc3ODg2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.CeHHa3ascsRVTPPlqnZvfm7ZxyzGffSLADuKbc4zi0Ne8Px33bMBz8ksNAJwkSyxFHgWTJY1r8dFNvg-pwSk_3xLhk1HxFs41nBHWsqYluhZEVMAOXIlqCCh5ocRbsZGGckQ9PegA7MqeVDPCdTPpEHrMhKMjkYy2j1Q0ClZ10VyRhGdEi_Iz3-TWfRGkvezrtl79YTMjWniHmN5RURG9MOZxFXhqIurGagvEUnEx4do-xAOU9MqXRoGdwvhfz6OXj-M8U-ogVohR0IJsOAqYz1PqAj6DUjTZ6sx188UIVFz4BI6aJAgnccqVWPKM1GIn4ljSvsEQycQuhBrSAV-rULCeifvJGNj1smxFwugqdoUMHm9W0J5OmzDFEPisE8LqK3Rc1aoJhEmGBDFPMT0rpUcRTIJ8IzsIziXZX3eP9N9B0oDBi0rU8DciPe0Vm5umeHrac6JYhSGYYvgkOeyzhiW8JJUt06pjSqTEdwVEIgBgcuXfQKA6lGpUUlQKe3akwZGb2jYHlnImXNXQoyqRRsruNMByl6zmhlrqRZ-srSrEcUDDSjW8xHTT-GqfRmwx7JCAHmvAFLd_yI9vqUXXEmNq3VMflY1l_D6j4DkVojD-PgbiWUdOc53bnyZw5uKzM7VnfHck6bk4BNfGtzhWpBEw7d8-u_fqL509jN5pXY"
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
                            {this.props.tags.map((item, key) => {
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
                        <select value={this.state.county.name} onChange={this.handleChange} name="county">
                            {this.props.judete.map((item, key) => {
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