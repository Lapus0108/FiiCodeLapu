import React, { Component } from 'react';
import './App.css';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Dropdown from "./Componente/DropdownJudete";
import background from "../src/assets/img/Background-map-page-2.jpg";
import Sidebar from "./Componente/Sidebar";
import { Router, Route, Link, BrowserRouter, Switch } from "react-router-dom";
import Registration from "./Componente/Registration";
import Cart from "./Componente/Cart";
import Navbar from "./Componente/Navbar2";
import ReactDOM from 'react-dom';
import ProductsPage from './Componente/ProductsPage';
import Login from './Componente/Login';
import HomeMenu from "./Componente/HomeMenu";
import {withRouter} from 'react-router';
import AddProduct from "./Componente/Adauga_articol";
import SingleProduct from "./Componente/SingleProduct";



//GOOGLE MAPS DEFAULT STYLE
const mapStyles = {
    width: '100%',
    height: '100%'
  };

  //AICI SE ADAUGA LABELURILE DIN BARA DE MENIURI
  const items = [
    { name: 'home', label: 'Home' },
    { name: 'profile', label: 'Profile' },
    { name: 'myorders', label: 'My orders' },
    { name: 'products', label: 'Products' },
    { name: 'cart', label: 'Cart' },
    {name:  'retromailing', 
    label: 'Retro mailing',
    items:[
      { name: 'scrisori', label: 'About letters' },
      { name: 'harta_scrisori', label: 'Send your letter!' },
    ]
  },
    {
      name: 'setari',
      label: 'Settings',
      items: [
        { name: 'setari_cont', label: 'Account settings' },
        { name: 'setari_notificari', label: 'Notification settings' },
      ],
    },
    { name: 'logout', label: 'Logout' },
  ]
  // const judete={
  //   1:{
  //     nume: "Iasi",
  //     lat_centru: 44,
  //     long_centru:55
  //   },
  //   2:{
  //     nume: "Bucuresti",
  //     lat_centru: 42,
  //     long_centru:34
  //   },
  //   3:{
  //     nume: "Timisoara",
  //     lat_centru:33,
  //     long_centru:41
  //   }
  // }
  //  console.log(judete)
  //  const returnedArray = Array.from(judete)
  //  console.log(returnedArray)                          SUNT PESTE TOT IN STATE UNDE E NEVOIE(register, add_product)



  export class MapContainer extends Component {
    constructor(props){
      super(props);
    
      this.handleSuccessfulAuth=this.handleSuccessfulAuth.bind(this);
      this.state={
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
           <Sidebar items={items}/> 
          
          
          <BrowserRouter>
            <div className="App">
            
               <Switch>


                    {/* PAGINA PRODUSE */}
                    
                    <Route exact path="/products" component={props=>(
                    <>
                    <Navbar/> 
                    <ProductsPage/>
                    </>)}/>

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
                          component={HomeMenu}/> 

                  {/* PAGINA ADAUGA PRODUS */}

                  <Route 
                          path="/add_product" 
                          component={AddProduct}/>   

                  {/* PAGINA PRODUS INDIVIDUAL */}

                  <Route 
                          path="/single_product" 
                          component={SingleProduct}/>     

                   {/* PAGINA REGISTER */}

                   <Route 
                        path="/register" 
                        component={props=>(
                          <Registration
                          handleSuccessfulAuth={this.handleSuccessfulAuth}
                          />
                        )}/>

                   {/* PAGINA LOGIN */}

                   <Route 
                        path="/login" 
                        component={props=>(
                          <Login
                          handleSuccessfulAuth={this.handleSuccessfulAuth}
                          />
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