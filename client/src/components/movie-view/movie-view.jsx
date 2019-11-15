import React from 'react';
// import axios from 'axios';
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

	render() {
		const { movie, directors, genres } = this.props;

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
                {genres.find(g => g._id === mg).name}
              </Link>
            </li>)}</ul></div> 	
				</div>   
        <div className="movie-director">
          <div className="label">Director</div>
          <div className="value"><Link to={`/directors/${movie.director}`}>
            {directors.find(d => d._id === movie.director).name}
          </Link></div>  
        </div>
				<Link to={`/`}>
					<Button variant="info">Back</Button>
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
    genres: state.genre,
    directors: state.director
  }
}

export default connect(mapStateToProps)(MovieView);