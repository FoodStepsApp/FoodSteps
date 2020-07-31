import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import marker from '../assets/images/marker.png';

const AnyReactComponent = ({ text }) => <div><img src={marker} /></div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 17.346679,
      lng: 78.550938
    },
    zoom: 10
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAlVb69NSWEFHJ6Zq1dYlQWb8f3_LeG65M' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={17.445726}
            lng={78.348720}
            text="My Marker"
          />
          <AnyReactComponent
            lat={17.327152}
            lng={78.603967}
            text="My Marker"
          />
          <AnyReactComponent
            lat={17.346679}
            lng={78.550938}
            text="My Marker2"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;