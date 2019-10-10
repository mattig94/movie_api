import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
	render() {
		const { movie, onClick } = this.props;
		return(
			<Card style={{ width: '100%'}}>
			<Card.Img variant="top" src={movie.imgURL}/>
			<Card.Body>
			<Card.Title>{movie.title}</Card.Title>
			<Card.Text>{movie.description}</Card.Text>
			<Link to={`/movies/${movie._id}`}>
				<Button variant="info">Open</Button>
			</Link>
			</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imgURL: PropTypes.string.isRequired
	}).isRequired,
};