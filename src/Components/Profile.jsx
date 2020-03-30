import React, {Component} from 'react';
import poza_profil from '../assets/images/vazatest.jpg';
import your_products from '../assets/images/Icons/Published.png';
import purchased_products from '../assets/images/Icons/Cart_full.png';
import Moment from 'react-moment';
import axios from 'axios';

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
          name:"",
          email:"",
          county:"",
          seePublished:false,
          seePurchased: false,
          produsele_mele:[]
        }
        this.showPublished=this.showPublished.bind(this);
        this.showPurchased=this.showPurchased.bind(this);
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

    componentDidMount(){

        

        this.getHttpClient().get("user/products")
        .then(res => {
            const produs = res.data;
            this.setState({produsele_mele: produs});
            console.log(produs)
            
        })
          console.log(this.state.produsele_mele)
          this.setState({
            name:this.props.user.name,
            email:this.props.user.email
        })
    }

    showPublished(){
        console.log("Show published clicked");
        this.setState({seePublished:true, seePurchased:false})
        
    }

    showPurchased(){
        console.log("Show purchased clicked");
        this.setState({seePurchased:true,seePublished:false})
    }

    render() {
        
       return (
            <div>
                
                <div className="container_user_info_profile">
                    <div className="container_imagine_profile">
                      <img src={poza_profil}/>
                    {this.props.isLoggedIn ? <div className="status_user" style={{color:"green", fontWeight: 600}}>LOGGED IN</div>
                    : <div className="status_user" style={{color:"red"}}>NOT LOGGED IN</div>}
                    </div>
                    <div className="container_date_profile">
                        <div className="info_user_text">Username: {this.state.name}</div>
                        <div className="info_user_text">Email: {this.state.email}</div>
                        <div className="info_user_text">County: Iasi, Romania</div>
                        <div className="info_user_text">Click to see to see your published articles
                        <img src={your_products} onClick={this.showPublished}/>
                        </div>
                        <div className="info_user_text">Click to see the purchased items
                        <img src={purchased_products} onClick={this.showPurchased}/>
                        </div>

                       
                    </div>
                </div>

                {this.state.seePublished ?
                <div className="container_tranzactii">
                    <div className="titlu_tranzactii">Your last products published on the market:</div>
                    <div className="container_ultimele_tranzactii">
                        {this.state.produsele_mele.reverse().map((item)=>{
                            return(
                        
                        <div className="tranzactie">
                            <div className="nume">Product: {item.title}</div>
                            <div className="nume">Price: {item.price} RON</div>
                            <div className="nume">Published on: {" "}
                            <Moment format="DD.MM.YYYY">{item.created_at}</Moment>
                            </div>
                        {item.max_quantity ?
                            <div className="nume">Status: Avalabile</div>
                            : 
                            <div className="nume">Status: Unavalabile</div>
                        }

                        </div>
                            )})}
                    </div>
                
                </div>
                : ""}

                {this.state.seePurchased ?
                <div className="container_tranzactii">
                    <div className="titlu_tranzactii">Your last products bought from the market:</div>
                    <div className="container_ultimele_tranzactii">
                        <div className="tranzactie">
                            <div className="nume">Product: Vaza veche</div>
                            <div className="nume">Price: 230 RON</div>
                            <div className="nume">Bought on:{" "}
                            <Moment format="DD.MM.YYYY">2020-03-29 14:37:19</Moment>
                            </div>

                        </div>
                    </div>
                
                </div>
                : ""}


                
        </div>
        )
        
    }
}