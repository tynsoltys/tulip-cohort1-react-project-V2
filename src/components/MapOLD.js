import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Map extends React.Component {
    constructor(props) {
        super(props);
    
        const {lat, lng} = this.props.initialCenter;
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          }
        }
    }
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            }
        }
        this.loadMap();
      }

    componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
        this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
        this.recenterMap();
    }
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng)
            map.panTo(center)
        }
      }
    

    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const {google} = this.props;
            const maps = google.maps;
        
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
        
            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);


            let centerChangedTimeout;
            this.map.addListener('dragend', (evt) => {
              if (centerChangedTimeout) {
                clearTimeout(centerChangedTimeout);
                centerChangedTimeout = null;
              }
              centerChangedTimeout = setTimeout(() => {
                this.props.onMove(this.map);
              }, 0);
            })
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '50%'
        }
      return (
        <div ref='map' style={style}>
            <h2> Loading map... </h2>
            <Map google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

            </Map>
        </div>
      )
    }
  }

  Map.propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object,
    onMove: PropTypes.func
  }
  Map.defaultProps = {
    zoom: 13,
    // San Francisco, by default
    initialCenter: {
      lat: 43.653427,
      lng: -79.470211
    },
    onMove: function() {} // default prop
  }
  export default Map;