import React, {Component} from 'react';
import './App.css'
import NavigationBar from "./components/NavigationBar";
import Movie from "./components/Movie"
import MovieList from './components/MoviesList'
import MovieInfo from './components/MovieInfo'
import VideoPlayer from "./components/VideoPlayer";

import '@brainhubeu/react-carousel/lib/style.css';
import axios from 'axios';

import {
  API_URL, POPULAR_MOVIES_URL, POPULAR_SERIES_URL, DISCOVER_MOVIE_URL,
  API_KEY, FAMILY_MOVIES_ID, DOCUMENTARY_MOVIES_ID,
} from './Constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      popularSeries: [],
      family: [],
      documentary: [],
      searchedMovies: [],
      searchTerm: "",
      currentMovie: null,
      videoPlaying: false,
    };
  }

  // Fetch data to four lists: popular movies, popular series, family movies, documentary movies
  componentDidMount() {
    axios.get(`${API_URL}${POPULAR_MOVIES_URL}?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => {
        this.setState({ popularMovies: response.data.results })
      });

    axios.get(`${API_URL}${POPULAR_SERIES_URL}?api_key=${API_KEY}&language=en-US&page=1`)
      .then(response => {
        this.setState({ popularSeries: response.data.results })
      });

    axios.get(`${API_URL}${DISCOVER_MOVIE_URL}?api_key=${API_KEY}&language=en-US&page=1&with_genres=${FAMILY_MOVIES_ID}`)
      .then(response => {
        this.setState({ family: response.data.results })
      });

    axios.get(`${API_URL}${DISCOVER_MOVIE_URL}?api_key=${API_KEY}&language=en-US&page=1&with_genres=${DOCUMENTARY_MOVIES_ID}`)
      .then(response => {
        this.setState({ documentary: response.data.results })
      });
  }

  // Fetch data (from search query) on submit (enter keypress)
  handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchTerm}`)
      .then(response => {
        this.setState({ searchedMovies: response.data.results })
      })
  };

  // Update search term on keypress
  handleChange = (e) => {
    this.setState({searchTerm: e.target.value})
  };

  // Switch playing video state
  playVideo = () => {
    if (this.state.videoPlaying) {
      this.setState({videoPlaying: false})
    } else {
      this.setState({videoPlaying: true});
    }
  };

  // Create list of movies
  createMovieList = (movies) => {
    return (
      movies.map(movie => {
        return <Movie id={movie.id}
                      imageURL={movie.poster_path}
                      viewMovieInfo={this.viewMovieInfo}
                      title={movie.title !== undefined ? movie.title : movie.name} />
      })
    )
  };

  // Find and set the current detailed movie. Executes when user clicks on movie to view movie details.
  viewMovieInfo = (id) => {
    let selectedMovie;
    let allMovies = this.state.popularMovies.concat(this.state.popularSeries, this.state.family, this.state.documentary, this.state.searchedMovies);
    allMovies.forEach(movie => {
      if (movie.id === id) {
        selectedMovie = movie;
      }
    });
    this.setState({ currentMovie: selectedMovie });
  };

  // Jump out of detailed view. Executes when user clicks on "Go back" button.
  closeMovieInfo = () => {
    this.setState({ currentMovie: null});
  };

  render() {
    const { popularMovies, popularSeries, family, documentary, searchedMovies } = this.state;

    return (
      <div className="App">
        <NavigationBar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        {
          // Show search results page if search query has been submitted (in case user deletes the search query, show default page)
          this.state.searchTerm !== "" && this.state.searchedMovies.length > 0 ?
            <MovieList movies={this.createMovieList(searchedMovies)} title={'Search results'}/> :
            // Show preview page in default. Show movie detail in case any movie (currentMovie) was clicked
            this.state.currentMovie === null ?
              <div>
                <MovieList movies={this.createMovieList(popularMovies)} title={'Popular movies'}/>
                <MovieList movies={this.createMovieList(popularSeries)} title={'Popular series'}/>
                <MovieList movies={this.createMovieList(family)} title={'Family'}/>
                <MovieList movies={this.createMovieList(documentary)} title={'Documentary'} />
              </div> :
              // Show video playing page if watch movie was clicked
              this.state.videoPlaying === false ?
                <MovieInfo currentMovie={this.state.currentMovie}
                           closeMovieInfo={this.closeMovieInfo}
                           playVideo={this.playVideo}/> :
                <VideoPlayer playVideo={this.playVideo}/>
        }
      </div>
    );
  }
}

export default App;
