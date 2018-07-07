import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const { REACT_APP_GAPI_KEY } = process.env;

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      stores: this.props.storesWithProduct,
      isLoading: true 
    };

  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };

  render() {

    const { activeMarker, stores, showingInfoWindow, selectedPlace } = this.state;

    return (
      
      <div className="mapContainer">

            <Map 
              google={this.props.google} 
              markers={stores}
              zoom={10}
              initialCenter={{lat: 43.653427, lng: -79.470211}}
              >
               {stores.map(marker => 
                  <Marker
                  onClick={this.onMarkerClick}
                  mapTypeControl={false}
                  key={marker.id}
                  name={marker.name}
                  position={{lat: marker.latitude, lng: marker.longitude}}
                  address_line_1 = {marker.address_line_1}
                  city = {marker.city}
                  postalCode = {marker.postalCode}
                  quantity = {marker.quantity}
                  />
                )}

                  <InfoWindow
                    marker={activeMarker}
                    visible={showingInfoWindow}>
                      <div>
                        <h3 className="store-name">{selectedPlace.name}</h3>
                        <h4 className="address">{selectedPlace.address_line_1}</h4>
                        <h5 className="city">{selectedPlace.city}</h5>
                        <p className="quantity">Quantity: {selectedPlace.quantity}</p>
                      </div>
                  </InfoWindow>

            </Map>

      </div>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: REACT_APP_GAPI_KEY
})(Container)