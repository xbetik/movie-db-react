import React from 'react';
import Carousel from "@brainhubeu/react-carousel";

/** Movie List component
 * represents one row (carousel) of movies (typically a category of movies)
 */
const movieList = (props) => {
  return (
    <div className="row" style={{width: "70%"}}>
      <div className="col s12">
        <p style={{height: "0px", fontSize: "large", fontWeight: "bold"}}>{props.title}</p>
      </div>
      <div className="col s12" style={{textAlign: "center"}}>
        <Carousel slidesPerPage={6}
                  arrows
                  itemWidth={200}
                  slides={props.movies}/>
      </div>
    </div>
  );
};

export default movieList;
