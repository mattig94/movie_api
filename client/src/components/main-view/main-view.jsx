import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import {RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			user: null
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getMovies(accessToken);
		}
	}

	onMovieClick(movie) {
		let movies = this.state.movies;
		this.setState({
			movies: movies,
		});
	}

	onBackButtonClick() {
		let movies = this.state.movies;
		this.setState({
			movies: movies,
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

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.location.reload();
	}

	render() {
		const { movies, user } = this.state;

		if (!movies) return <div className="main-view"/>;
		return (
			<Router>
				<div className="main-view">
					<Container>
						<Row>
							<Col>
								<header>millenial movies</header>
							</Col>
							<Col sm={3} lg={2}>
								<Button size="sm" variant="light" onClick={() => this.logout()}>Log Out</Button>
							</Col>
						</Row>
						<Row>						
							<Route exact path="/" render={() => 
								{
									if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
									return movies.map(m => <Col key={m._id} xl={3} lg={4} md={6} sm={12}><MovieCard key={m._id} movie={m}/></Col>)
								}
							}/>

							<Route path="/register" render={() => <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>}/>

							<Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

							<Route path="/director/:name"/>
							<Route path="/genre/:name"/>
						</Row>
					</Container>
				</div>
			</Router>
		);
	}
}
