import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

/*import './genre-view.scss';*/

export class GenreView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { genre } = this.props;
		if (!genre) return null;
		return (
			<div className="genre-view">
				<div className="genre-name">{genre.name}</div>
				<div>{genre.description}</div>
				<Link to={`/`}>
					<Button variant="info">Home</Button>
				</Link>
			</div>
		)
	}
}

GenreView.propTypes = {
	genre: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string
	}).isRequired,
};