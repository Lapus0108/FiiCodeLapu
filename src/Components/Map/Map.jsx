import React, {Component} from 'react';
import Dropdown from "./CountiesDropdown";
import {InfoWindow, Map, Marker} from "google-maps-react";

export default class AboutUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,  //Hides or the shows the infoWindow
            activeMarker: {},          //Shows the active marker upon click
            selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
            oficii_post: [
                {lat: 47.257309, lng: 27.600330},
                {latitude: 47.257423, longitude: 27.600332},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}
            ]
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
            <div className="titlu_pagina_harta">Unde poti trimite cel mai rapid scrisoarea?
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
                    {/* {this.displayMarkers()} */}
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Oficiul postal nr 1'}
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
                <Dropdown/>
            </div>
            </>
        )
    }
}
