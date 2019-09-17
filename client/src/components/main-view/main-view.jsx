import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import {RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: null,
			selectedMovie: null,
			user: null,
			registered: null
		};
	}

	componentDidMount() {
		axios.get('https://my-millennial-movies.herokuapp.com/movies')
		.then(response => {
			this.setState({
				movies: response.data
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	onMovieClick(movie) {
		let movies = this.state.movies;
		this.setState({
			movies: movies,
			selectedMovie: movie
		});
	}

	onBackButtonClick() {
		let movies = this.state.movies;
		this.setState({
			movies: movies,
			selectedMovie: null
		})
	}

	getMovies(token) {
		axios.get('https://my-millennial-movies.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => {
			this.setState({
				movies: response.data
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.username
		});
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.username);
		this.getMovies(authData.token);
	}

	newRegistration(registered) {
		this.setState({
			registered: false
		});
	}

	render() {
		const { movies, selectedMovie, user, registered } = this.state;

		if (!user && registered === null) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} newRegistration={() => this.newRegistration()}/>;

		if (!user && registered === false) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>;

		if (!movies) return <div className="main-view"/>;
		return (
			<div className="main-view">
				<Container>
					<Row>
							{
								selectedMovie
								? <MovieView movie={selectedMovie} onClick={() => this.onBackButtonClick()}/>
								: movies.map(movie => (
								<Col key={movie._id} xl={3} lg={4} md={6} sm={12}>
								<MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
								</Col>
								))
							}
					</Row>
				</Container>
			</div>
		);
	}
}
