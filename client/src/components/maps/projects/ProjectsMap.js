import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './projectsmap.css';
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FlyToInterpolator
} from 'react-map-gl';

import PropertyPanel from './map-panel';
import PropertyMarker from './map-marker';
import PropertyInfo from './popup-info';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
class ProjectsMap extends Component {
  state = {
    viewport: {
      latitude: 33.815147,
      longitude: -118.042603,
      zoom: 10,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    },
    popupInfo: null
  };
  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }
  _resize = () =>
    this._onViewportChange({
      width: this.props.width || window.innerWidth,
      height: this.props.height || window.innerHeight
    });
  _updateViewport = viewport => {
    this.setState({ viewport });
  };
  _onViewportChange = viewport =>
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  _goToViewport = property => {
    let [longitude, latitude] = property.location.center;

    this._onViewportChange({
      longitude,
      latitude,
      zoom: 12,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
    return sleep(3000).then(() => this.setState({ popupInfo: property }));
  };
  _renderMarker = (property, index) => {
    let [longitude, latitude] = property.location.center;

    return (
      <Marker key={`marker-${index}`} longitude={longitude} latitude={latitude}>
        <PropertyMarker
          size={26}
          onClick={() => this.setState({ popupInfo: property })}
        />
      </Marker>
    );
  };
  _renderPopup() {
    const { popupInfo } = this.state;
    if (popupInfo === null) {
      return null;
    }
    let [longitude, latitude] = popupInfo.location.center;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={longitude}
          latitude={latitude}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PropertyInfo info={popupInfo} />
        </Popup>
      )
    );
  }
  render() {
    const { viewport, settings } = this.state;
    return (
      <div>
        <MapGL
          {...viewport}
          {...settings}
          mapStyle="mapbox://styles/mapbox/outdoors-v10"
          dragToRotate={false}
          onViewportChange={this._updateViewport}
          mapboxApiAccessToken={TOKEN}
        >
          {this.props.posts.items.map(this._renderMarker)}
          {this._renderPopup()}

          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

          <PropertyPanel
            containerComponent={this.props.containerComponent}
            info={this.props.posts.items}
            onViewportChange={this._goToViewport}
            popup={this._renderPopup}
            projectName={this.props.projectName}
          />
        </MapGL>
      </div>
    );
  }
}

export default ProjectsMap;
