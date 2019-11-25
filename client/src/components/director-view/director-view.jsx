import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

/*import './director-view.scss';*/

export class DirectorView extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { director } = this.props;
		if (!director) return null;
		else if (!director.deathYear)
			return (
				<div className="director-view">
					<div className="director-name">
						<h3>{director.name}</h3>
					</div>
					<div className="label">About:</div>
					<div className="value">{director.bio}</div>
					<div className="label">Born:</div>
					<div className="value">{director.birthYear}</div>
					<Link to={`/`}>
						<Button variant="info">Back</Button>
					</Link>
				</div>
			)
		else
			return (
				<div className="director-view">
					<div className="director-name">
						<h3>{director.name}</h3>
					</div>
					<div className="label">About:</div>
					<div className="value">{director.bio}</div>
					<div className="label">Born:</div>
					<div className="value">{director.birthYear}</div>
					<div className="label">Died:</div>
					<div className="value">{director.deathYear}</div>
					<Link to={`/`}>
						<Button variant="info">Home</Button>
					</Link>
				</div>
			)
	}
}

DirectorView.propTypes = {
	director: PropTypes.shape({
		name: PropTypes.string,
		bio: PropTypes.string,
		birthYear: PropTypes.string,
		deathYear: PropTypes.string
	}).isRequired,
};