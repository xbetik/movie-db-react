import React from 'react';
import 'shaka-player/dist/controls.css';
const shaka = require('shaka-player/dist/shaka-player.ui.js');

class VideoPlayer extends React.PureComponent{

  constructor(props){

    super(props);

    //Creating reference to store video component on DOM
    this.videoComponent = React.createRef();

    //Creating reference to store video container on DOM
    this.videoContainer = React.createRef();

    //Initializing reference to error handlers
    this.onErrorEvent = this.onErrorEvent.bind(this);
    this.onError = this.onError.bind(this);

  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  componentDidMount(){
    var manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8';

    //Getting reference to video and video container on DOM
    const video = this.videoComponent.current;
    const videoContainer = this.videoContainer.current;

    //Initialize shaka player
    var player = new shaka.Player(video);

    //Setting up shaka player UI
    const ui = new shaka.ui.Overlay(player, videoContainer, video);
    ui.getControls();

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player.load(manifestUri).then(function() {
      // This runs if the asynchronous load is successful.
    }).catch(this.onError);  // onError is executed if the asynchronous load fails.
  }

  render(){
    /*
    Returning video with a container which is required to load shaka player UI.
    */
    return (
      <div className="container">
        <div className="row" onClick={this.props.playVideo} style={{cursor: "pointer"}}>
          <i className="material-icons">arrow_back</i>
          <span><b>Go back</b></span>
        </div>

        <div ref={this.videoContainer}>
          <video
            className="shaka-video"
            ref={this.videoComponent}
            poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
            style={{margin: "auto"}}
            autoPlay
          />
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
