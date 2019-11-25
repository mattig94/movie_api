import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//use bootstrap card?
import Button from 'react-bootstrap/Button';


import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {
	
	constructor() {
		super();
		this.state = {};
	}

    addFavorite(movieID) {
    axios.post(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movieID}`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      alert("Movie has been added to favorites");
    })
    .catch(e => {
      console.log('There was an issue adding movie to favorites')
    }); 
  }

	render() {
		const { movie, directors, genres } = this.props;

    if (!movie) return null;

		return (
			<div className="movie-view">
				<div className="movie-title">
					<div className="label">Title</div>
					<div className="value">{movie.title}</div>
				</div>
				<div className="movie-description">
					<div className="label">Description</div>
					<div className="value">{movie.description}</div>
				</div>
				<img className="movie-poster" src={movie.imgURL} />
				<div className="movie-genre">
					<div className="label">Genre</div>
					<div className="value"><ul>{movie.genres.map(mg => 
            <li key={mg}>
              <Link to={`/genres/${mg}`}>
                {(genres.find(g => g._id === mg)||{}).name}
              </Link>
            </li>)}</ul></div> 	
				</div>   
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value"><Link to={`/directors/${movie.director}`}>
            {(directors.find(d => d._id === movie.director)||{}).name}
          </Link></div>  
        </div>
        <Button onClick={() => this.addFavorite(movie._id)}>Add to Favorites</Button>
				<Link to={`/`}>
					<Button variant="info">Home</Button>
				</Link>
			</div>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imgURL: PropTypes.string.isRequired,
	}).isRequired,
};

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies,
    genres: state.genres,
    directors: state.directors
  }
}

export default connect(mapStateToProps)(MovieView);