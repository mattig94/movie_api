import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import { setMovies } from '../../actions/actions';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieList } from '../movie-list/movie-list';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			directors: [],
			genres: [],
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
			this.getDirectors(accessToken);
			this.getGenres(accessToken);
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
			this.props.setMovies(response.data);
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	getDirectors(token) {
		axios.get('https://my-millennial-movies.herokuapp.com/directors', {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => {
			this.setState({
				directors: response.data
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	getGenres(token) {
		axios.get('https://my-millennial-movies.herokuapp.com/genres', {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => {
			this.setState({
				genres: response.data
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
		this.getDirectors(authData.token);
		this.getGenres(authData.token);
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.open('/', '_self');
	}

	render() {
		let { movies } = this.props;
		const { user, directors, genres } = this.state;

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
								<Dropdown>
									<Dropdown.Toggle>
										My Profile
									</Dropdown.Toggle>
									<Dropdown.Menu>
									<Link to={`/users/${user}`} className="dropdown-item">View Profile</Link>
									<Dropdown.Item onClick={() => this.logout()}>Log Out</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Col>
						</Row>
						<Row>						
							<Route exact path="/" render={() => 
								{
									if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
									return <MovieList movies={movies}/>;
								}
							}/>

							<Route path="/register" render={() => <RegistrationView onLoggedIn={user => this.onLoggedIn(user)}/>}/>

							<Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} genre={genres} director={directors}/>}/>

							<Route path="/directors/:directorId" render={({match}) => <DirectorView director={directors.find(d => d._id === match.params.directorId)}/>}/>

							<Route path="/genres/:genreId" render={({match}) => <GenreView genre={genres.find(g => g._id === match.params.genreId)}/>}/>

							<Route path="/users/:user" render={() => <ProfileView/>}/>

							<Route path="/users/update/:user" render={() => <ProfileUpdate/>}/>
						</Row>
					</Container>
				</div>
			</Router>
		);
	}
}

let mapStateToProps = state => {
	return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
