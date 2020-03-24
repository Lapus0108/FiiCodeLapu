import React, { Component } from 'react';
import './App.css';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Dropdown from "./Componente/DropdownJudete";
import background from "../src/assets/img/Background-map-page-2.jpg";
import Sidebar from "./Componente/Sidebar";
import { Route, BrowserRouter, Switch,Router } from "react-router-dom";
import Registration from "./Componente/Registration";
import Cart from "./Componente/Cart";
import Navbar from "./Componente/Navbar2";
import ProductsPage from './Componente/ProductsPage';
import Login from './Componente/Login';
import HomeMenu from "./Componente/HomeMenu";
import AddProduct from "./Componente/Adauga_articol";
import SingleProduct from "./Componente/SingleProduct";
import Mailing from "./Componente/Mailing";
import AboutUs from "./Componente/AboutUs";




//GOOGLE MAPS DEFAULT STYLE
const mapStyles = {
    width: '100%',
    height: '100%'
  };

  //AICI SE ADAUGA LABELURILE DIN BARA DE MENIURI
  const items = [
    { name: 'home', label: 'Home' },
    { name: 'about_us', label: 'About us'},
    { name: 'profile', label: 'Profile' },
    // { name: 'myorders', label: 'My orders' },
    { name: 'add_product', label: 'Add product'},
    { name: 'products', label: 'Products' },
    { name: 'cart', label: 'Cart' },
    {name:  'mailing', 
    label: 'Retro mailing',
    items:[
      { name: 'mailing', label: 'About letters' },
      { name: 'map', label: 'Send your letter!' },
    ]
  },
    {
      name: 'settings',
      label: 'Settings',
      items: [
        { name: 'account_settings', label: 'Account settings' },
        { name: 'notif_settings', label: 'Notification settings' },
      ],
    },
    
  ]
 const judete = [
  {
      "id": 28,
      "name": "Alba"
  },
  {
      "id": 1,
      "name": "Arad"
  },
  {
      "id": 11,
      "name": "Arges"
  },
  {
      "id": 3,
      "name": "Bacau"
  },
  {
      "id": 19,
      "name": "Bihor"
  },
  {
      "id": 21,
      "name": "Bistrita-Nasaud"
  },
  {
      "id": 18,
      "name": "Botosani"
  },
  {
      "id": 37,
      "name": "Braila"
  },
  {
      "id": 4,
      "name": "Brasov"
  },
  {
      "id": 46,
      "name": "Bucuresti - Ilfov"
  },
  {
      "id": 36,
      "name": "Buzau"
  },
  {
      "id": 40,
      "name": "Calarasi"
  },
  {
      "id": 26,
      "name": "Caras-Severin"
  },
  {
      "id": 2,
      "name": "Cluj"
  },
  {
      "id": 7,
      "name": "Constanta"
  },
  {
      "id": 29,
      "name": "Covasna"
  },
  {
      "id": 35,
      "name": "Dambovita"
  },
  {
      "id": 8,
      "name": "Dolj"
  },
  {
      "id": 9,
      "name": "Galati"
  },
  {
      "id": 41,
      "name": "Giurgiu"
  },
  {
      "id": 33,
      "name": "Gorj"
  },
  {
      "id": 23,
      "name": "Harghita"
  },
  {
      "id": 27,
      "name": "Hunedoara"
  },
  {
      "id": 39,
      "name": "Ialomita"
  },
  {
      "id": 10,
      "name": "Iasi"
  },
  {
      "id": 16,
      "name": "Maramures"
  },
  {
      "id": 32,
      "name": "Mehedinti"
  },
  {
      "id": 22,
      "name": "Mures"
  },
  {
      "id": 24,
      "name": "Neamt"
  },
  {
      "id": 43,
      "name": "Olt"
  },
  {
      "id": 6,
      "name": "Prahova"
  },
  {
      "id": 20,
      "name": "Salaj"
  },
  {
      "id": 15,
      "name": "Satu Mare"
  },
  {
      "id": 12,
      "name": "Sibiu"
  },
  {
      "id": 17,
      "name": "Suceava"
  },
  {
      "id": 42,
      "name": "Teleorman"
  },
  {
      "id": 13,
      "name": "Timis"
  },
  {
      "id": 38,
      "name": "Tulcea"
  },
  {
      "id": 34,
      "name": "Valcea"
  },
  {
      "id": 30,
      "name": "Vaslui"
  },
  {
      "id": 31,
      "name": "Vrancea"
  }
]
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


  export class MapContainer extends Component {
    constructor(props){
      super(props);
    
      this.handleSuccessfulAuth=this.handleSuccessfulAuth.bind(this);
      this.state={
        isLoggedIn: true,  //IN FUNCTIE DE ASTA IAU MAI DEPARTE DACA E LOGAT
        user:{
          email: "",
          password:"",
               
          id: "",
          user_token:""
        },
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
        // oficii_post: [
            //  {lat: 47.257309, lng: 27.600330},
        //   {latitude: 47.257423, longitude: 27.600332},
        //   {latitude: 47.2052192687988, longitude: -121.988426208496},
        //   {latitude: 47.6307081, longitude: -122.1434325},
        //   {latitude: 47.3084488, longitude: -122.2140121},
        //   {latitude: 47.5524695, longitude: -122.0425407}
      // ]
      }
    }

      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    handleSuccessfulAuth(data){
      this.props.handleLogin(data);
      this.props.history.push("/dashboard");
    }
    // displayMarkers = () => {
    //   return this.state.oficii_post.map((item, index) => {
    //     return <Marker key={index} id={index} position={{
    //      lat: item.latitude,
    //      lng: item.longitude
    //    }}
    //    onClick={() => {console.log("You clicked me!")
    //   this.setState({activeMarker: true})}} />
    //   })
    // }

    render() {
 
      return (
        <div className="total">
          <div className="background_map_page">
              <img src={background}></img>
              </div>
          
          
          
          <BrowserRouter>
            <div className="App">
            {this.state.isLoggedIn===true
                  ?  <Sidebar items={items}/>
                  : ""}
               <Switch>


                    {/* PAGINA PRODUSE */}
                    
                    <Route exact path="/products" component={props=>(
                    <>
                    <Navbar/> 
                    <ProductsPage
                    categories={categories}
                    isLoggedIn={this.state.isLoggedIn}
                    judete={judete}
                    />
                    </>)}
                    />

                   {/* PAGINA CART */}

                    <Route 
                          path="/cart" 
                          component={props=>(
                            <>
                            <Navbar/>
                            <Cart/>
                            
                            </>
                          )}
                    />
                    

                   {/* PAGINA INCEPUT */}

                   <Route 
                          path="/home" 
                          component={props=>(
                          <HomeMenu
                          isLoggedIn={this.state.isLoggedIn}
                          />
                          )}
                  />


                  {/* PAGINA ADAUGA PRODUS */}

                  <Route 
                          path="/add_product" 
                          component={props=>(
                          <AddProduct
                          judete={judete}
                          categories={categories}
                          />  
                          )} />


                  {/* PAGINA PRODUS INDIVIDUAL */}

                  <Route 
                          path="/products/1" 
                          component={SingleProduct}/>     

                   {/* PAGINA REGISTER */}

                   <Route 
                        path="/register" 
                        component={props=>(
                          this.state.isLoggedIn===false ?
                          <Registration
                          judete={judete}
                          isLoggedIn={this.state.isLoggedIn}
                          handleSuccessfulAuth={this.handleSuccessfulAuth}
                          />
                          : ""
                        )}/>

                  {/* PAGINA SCRISORI */}

                  <Route 
                          path="/mailing" 
                          component={Mailing}/>  

                  {/* PAGINA ABOUT US */}

                  <Route 
                          path="/about_us" 
                          component={AboutUs}/>  

                   {/* PAGINA LOGIN */}

                   <Route 
                        path="/login" 
                        component={props=>(
                          this.state.isLoggedIn===false ?
                          <Login
                          isLoggedIn={this.state.isLoggedIn}
                          handleSuccessfulAuth={this.handleSuccessfulAuth}
                          
                          />
                          :""
                        )}/>

                   {/* PAGINA HARTA GOOGLE */}
                    <Route
                          path="/map"
                          exact
                          component={props => (
                            <>
                            <div className="titlu_pagina_harta">Unde poti trimite cel mai rapid scrisoarea?</div>
                            <div className="container_mapa_google">
                             
                            <Map
                            google={this.props.google}
                            zoom={14}
                            style={mapStyles}
                            initialCenter={{
                             lat: 47.157309,
                             lng:  27.600330
                            }}
                            
                          >
                            {/* {this.displayMarkers()} */}
                           <Marker
                            onClick={this.onMarkerClick}
                            name={'Oficiul postal nr 1'}
                          />
                          <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                            onClose={this.onClose}
                          ><div>
                          <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                            </InfoWindow>
                          </Map>
                          <Dropdown/> 
                          </div>
                          </>
           )}
        />
          </Switch>
        </div>
      </BrowserRouter>
        </div>
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: 'AIzaSyDNwR7Y528w5gyiSweT0IJ-awU2mPUEYhs'
  })(MapContainer);


//GOOGLE API KEY AIzaSyDcEaiQfgcMH2TowRayxYO2kgbEhbG1Aa4 (NU E BUN ASTA)
//GOOGLE API KEY WITH REGISTRATION AIzaSyDNwR7Y528w5gyiSweT0IJ-awU2mPUEYhs