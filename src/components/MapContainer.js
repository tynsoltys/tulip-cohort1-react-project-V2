
import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const { REACT_APP_GAPI_KEY } = process.env;
console.log(process.env);


export class Container extends React.Component {
  render() {
    const points = this.props.markers.map(marker => 
      ({lat: marker.latitude, lng: marker.longitude})
    )
    console.log("points",points);

    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    console.log("bounds",bounds);

    if (!this.props.loaded) {
      return <div class="centerText">SHOPS, SHOPS, SHOPS, SHOPSSHOPSSHOPS</div>
    }
    return (
      <div className="mapContainer">
            <Map 
              google={this.props.google} 
              markers={this.props.markers} 
              bounds={bounds} 
              zoom={10}
              initialCenter={{lat: 43.653427, lng: -79.470211}}
              >
               {this.props.markers.map(marker => 
                  <Marker key={marker.id} onClick={this.onMarkerClick}
                  name={marker.name} position={{lat: marker.latitude, lng: marker.longitude}}/>
                )}

              <InfoWindow onClose={this.onInfoWindowClose}>
                  <div>
                    <h1>Place Name</h1>
                  </div>
              </InfoWindow>
              {/* {this.props.google.maps.Map.fitBounds()} */}
            </Map>
            
            <a href="#" className="buttonizer"><h3 className="centerText">SOMETHING ELSE</h3></a>

      </div>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: REACT_APP_GAPI_KEY
})(Container)