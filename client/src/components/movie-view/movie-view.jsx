import React from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';

//use bootstrap card?
import Button from 'react-bootstrap/Button';


import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {
	
	constructor() {
		super();
		this.state = {};
    // this.directorInitialized = false;
	}

  // getDirector() {
  //   const { movie } = this.props;
  //   if(!movie) return;
  //   let accessToken = localStorage.getItem('token');
  //   if (accessToken !== null) {
  //     this.setState({
  //       user: localStorage.getItem('user')
  //     });
  //     axios.get(`https://my-millennial-movies.herokuapp.com/directors/${movie.director}`, {
  //       headers: { Authorization: `Bearer ${accessToken}` }
  //     })
  //     .then(response => {
  //       this.setState({
  //         directorObject: response.data
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  //   }
  // }

	render() {
		const { movie, director, genre } = this.props;
  //   const { directorObject } = this.state;
		// if(!movie) return null;
  //   if(!this.directorInitialized) {
  //     this.getDirector();
  //     this.directorInitialized = true;
  //   };
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
					<div className="value"><ul>{movie.genres.map(g => 
            <li>
              <Link to={`/genres/${g}`}>
                {g}
              </Link>
            </li>)}</ul></div> 	
				</div>
				<div className="movie-director">
					<div className="label">Director</div>
          {/*<div className="value">{directorObject && directorObject.name}</div>*/}
          <div className="value"><Link to={`/directors/${movie.director}`}>{movie.director}</Link></div>  
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