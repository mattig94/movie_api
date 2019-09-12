import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

export class MovieView extends React.Component {
	
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { movie, onClick } = this.props;
		if(!movie) return null;
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
					<div className="value">{movie.genre}</div> 	
				</div>
				<div className="movie-director">
					<div className="label">Director ID</div>
					<div className="value">{movie.director}</div>	
				</div>
				<Button variant="info" onClick={() => onClick()}>Back</Button>
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
	onClick: PropTypes.func.isRequired
};