import React, {Component} from 'react';
import {InfoWindow, Map, Marker, GoogleApiWrapper} from "google-maps-react";
import judete from 'assets/data/county.json'


const mapStyles = {
    width: '100%',
    height: '100%'
  };


export class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            oficii_post: [
                {latitude: 47.257423, longitude: 27.600332},
                {latitude: 47.166031, longitude: 27.585198},
                {latitude: 47.166031, longitude: 27.585198},
                {latitude: 47.161309, longitude: 27.617409},
                {latitude: 47.169602, longitude: 27.582909},
                {latitude: 47.175539, longitude: 27.553390},
                {latitude: 47.163959, longitude: 27.561690},
                {latitude:47.174461,  longitude: 27.549344}
            ],
            judet_ales:{
                id:"",
                nume:""
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
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

    displayMarkers = () => {
        return this.state.oficii_post.map((item, index) => {
            return <Marker key={index} id={index} position={{
                lat: item.latitude,
                lng: item.longitude
            }}
                           onClick={() => {
                               console.log("You clicked me!")
                               this.setState({activeMarker: true})
                           }}/>
        })
    }

    render() {
        return (
            <>
            <div className="titlu_pagina_harta">Unde poti trimite cel mai rapid scrisoarea?</div>
            
            <div className="dropdown_container">Select your county:
                        <select value={this.state.judet_ales.nume} onChange={this.handleChange} name="judet_ales" style={{marginLeft: 15, fontSize:30}}>
                            {judete.map((item, key) => {
                                return (
                                    <option value={item.id} onChange={this.handleChange}>{item.name}</option>
                                )
                            })}
                        </select>
             </div>

            <div className="container_mapa_google">

                <Map
                    google={this.props.google}
                    zoom={14}
                    style={""}
                    initialCenter={{
                        lat: 47.157309,
                        lng: 27.600330
                    }}

                >
                    {this.displayMarkers()}
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Postal office'}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                        <div>
                            <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                    </InfoWindow>
                </Map>
                
            </div>
            </>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDNwR7Y528w5gyiSweT0IJ-awU2mPUEYhs'
  })(MapContainer);
