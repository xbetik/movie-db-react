import React from "react";

/*** Movie component
 * represents one card in default view
  */

const movie = (props) => {
  return (
    (<div className="card">
      <div className="card-image waves-effect waves-block waves-light">
        <a href="/#" onClick={() => props.viewMovieInfo(props.id)}>
          { props.imageURL == null ?
            <img key={props.id}
                 src={'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'}
                 alt="Movie ImageURL not found"/> :
            <img key={props.id}
                 src={`https://image.tmdb.org/t/p/w500${props.imageURL}`}
                 alt="Movie not found"/> }
        </a>
        <h6 style={{height: "65px"}}>{props.title}</h6>
      </div>
    </div>)
  )
};

export default movie;
