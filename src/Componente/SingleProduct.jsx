import React from 'react';
import contact_button from "../images/pngwave.png";
import imagineArticol from "../images/vazatest.jpg";
import remove_article from "../images/remove_product.png";
import edit_article from "../images/edit_article.png";
import axios from "axios";

class SingleProduct extends React.Component {

    constructor() {
        super();
        this.state = {
            product: {
                id: 0,
                
                title: "Test Product",
                titleClicked: false,
                
                description: "This is just a basic product while we load the page. Check your internet connection if it takes too long",
                descriptionClicked:false,

                price: 0,
                priceClicked:false,

                negotiable: 0,
                negotiableClicked:false,

                seller_id: 0,
               
            },
            vizibilitateButoane: [false, false, false, false],
            user: JSON.parse(localStorage.getItem('user'))
        }
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
     // Actualizarea textului din input-uri
  handleChange = (event, index) => {
    const value = event.target.value;
    let userData = this.state.userData;
    switch (index) {
      case 0:
        this.setState(prevState => {
          product.title = value;
          return { userData };
        });
        break;
      case 1:
        this.setState(prevState => {
          product.description = value;
          return { userData };
        });
        break;
      case 2:
        this.setState(prevState => {
          product.price = value;
          return { userData };
        });
        break;
      case 3:
        this.setState(prevState => {
          product.negotiable = value;
          return { userData };
        });
        break;
      default: {
        alert(
          "Nu se poate actualiza textul inputului sau nu exista butonul cu indexul " +
            index
        );
      }
    }
  };

  afisareText = index => {
    const vizibilitateButon = this.state.vizibilitateButoane[index]
      ? "none"
      : "block";
    return vizibilitateButon;
  };

    remove_article_function = (e) => {

        const url = `http://localhost:8000/api/products/`;
        const id = this.props.match.params.product;
        e.preventDefault();
        axios.delete(url + id, {
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json",
                'Authorization': "Bearer " + JSON.parse(localStorage.getItem('user')).token
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        return (
            <>
            <div className="container_sgrpoduct_total">
                <div className="sgproduct_container">
                    <div className="sgproduct_titleart">Selected article: {this.state.product.title}</div>
                    <div className="sgproduct_title">Price: {this.state.product.price} RON</div>
                    {/*<div className="sgproduct_title">Sold by: {this.state.user.name}</div>*/}
                    {this.state.product.negociabil === true ?
                        <div className="sgproduct_conditionals">! Product is negotiable</div> : "" }
                    {/*{item.exchangeable === true ?*/}
                    {/*<div className="sgproduct_conditionals">! Product(s) in exchange may be accepted by the*/}
                    {/*seller</div> : "" }*/}
                    <div className="sgproduct_title">Description: {this.state.product.description}</div>
                </div>
                <div className="image_container_sgproduct">
                    <img src={imagineArticol} alt="imagine_articol_sgproduct"/>
                </div>

                <div>
                    {this.state.product.seller_id === this.state.user.id
                        ?
                        <div>
                            <button className="seller_tools" onClick={this.remove_article_function}>
                                <div className="buton_remove_article">
                                    <img src={remove_article} alt="remove_article"/>
                                </div>
                            </button>
                            <div>
                                <div className="buton_edit_article">
                                    <img src={edit_article} alt="edit_article"/>
                                </div>
                            </div>
                        </div>
                        : <></>
                    }
                </div>
            </div>
            </>
        )
    }
}
export default SingleProduct;