import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;
		return(
			<div onClick={() => onClick(movie)} className="movie-card">{movie.title}</div>
		);
	}
}

MovieCard.PropTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string
	}).isRequired,
	onClick: PropTypes.func.isRequired
};