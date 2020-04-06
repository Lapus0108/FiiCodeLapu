import React, {Component} from 'react';
import {InfoWindow, Map, Marker, GoogleApiWrapper} from "google-maps-react";
import judete from 'assets/data/county.json'
import oficii_post from 'assets/data/postal_offices.json';
import county_centres from 'assets/data/county_centres.json';

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
            judet_ales:0,
            lat_centru:47.165204,
            long_centru:27.582852
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            judet_ales: event.target.value},
        () => {  //callback
          console.log(this.state.judet_ales);
          this.setState({lat_centru:county_centres[this.state.judet_ales].latitude,
            long_centru:county_centres[this.state.judet_ales].longitude}) 
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
        return oficii_post.map((item, index) => {
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
            <div className="titlu_pagina_harta">Where can you quickly send the letter?</div>
            <div className="dropdown_container">Select your county:
                        <select value={this.state.judet_ales.nume} onChange={this.handleChange}  name="judet_ales" style={{marginLeft: 15, fontSize:30}}>
                            {judete.map((item, key) => {
                                return (
                                    <option value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
             </div>

            <div className="container_mapa_google">

            <Map
                    google={this.props.google}
                    zoom={13}
                    style={""}
                    center={{
                        lat:this.state.lat_centru,
                        lng:this.state.long_centru
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
