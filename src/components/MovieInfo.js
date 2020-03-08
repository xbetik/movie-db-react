import React from 'react';

const playButtonStyle = {
  padding: '15px',
  width:'20%',
  background: '#2196F3',
  fontSize: '20px',
  color: 'white'
};

/** Movie info component
 * executes after user clicked on a particular movie (shows details: description, average vote...)
 */

const movieInfo = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row" onClick={props.closeMovieInfo} style={{cursor: "pointer"}}>
          <i className="material-icons">arrow_back</i>
          <span><b>Go back</b></span>
        </div>
        <div className="row">
          <h3>{props.currentMovie.title !== undefined ? props.currentMovie.title : props.currentMovie.name}</h3>
        </div>
        <div className="row">
          <div className="col s12 m4">
            <img className=""
                 src={`https://image.tmdb.org/t/p/w500${props.currentMovie.poster_path}`}
                 alt="Movie ImageURL not found"
                 style={{ width: "100%"}}/>
          </div>
          <div className="col s12 m8">
            <div className="info-container">
              <p>Description: <b>{props.currentMovie.overview === null ? 'Undefined' : props.currentMovie.overview}</b></p>
              <p>Average vote: <b>{props.currentMovie.vote_average}</b></p>
              <p>Popularity: <b>{props.currentMovie.popularity}</b></p>
              <p>Release date: <b>{props.currentMovie.first_air_date !== undefined ?
                props.currentMovie.first_air_date.substring(6).split("-").concat(props.currentMovie.first_air_date.substring(0, 4)).join("/") :
                props.currentMovie.release_date.substring(6).split("-").concat(props.currentMovie.release_date.substring(0, 4)).join("/")}</b></p>
              <p>Original language: <b>{props.currentMovie.original_title}</b></p>
              <button onClick={props.playVideo} style={playButtonStyle}>Watch Movie</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default movieInfo;
