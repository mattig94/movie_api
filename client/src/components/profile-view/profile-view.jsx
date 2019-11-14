import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from "react-router-dom";

import './profile-view.scss';

export class ProfileView extends React.Component {
	constructor() {
		super();
		this.state ={
			user: null,
			userInfo: null,
		};	
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user')
			});
			this.getUserInfo(accessToken);
		}
	}

	getUserInfo(token) {
		axios.get(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => {
			this.setState({
				userInfo: response.data
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	deleteUser() {
		axios.delete(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		})
		.then(response => {
			alert("Your account has been deleted");
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.open('/', '_self');
		})
		.catch(e => {
			console.log('There was an issue deleting your account')
		});	
	}

	deleteFavorite(f) {
		axios.delete(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${f}`, {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
		})
		.then(response => {
			alert("Movie has been removed from favorites");
			window.open(`/users/${localStorage.getItem('user')}`, '_self');
		})
		.catch(e => {
			console.log('There was an issue removing movie from favorites')
		});	
	}

	render () {
		const { user, movies } = this.props
		const { userInfo } = this.state;

		if (!userInfo) return null;

		return(
			<div className="profile-view">
				<h3>My Profile</h3>
				<ListGroup>
					<ListGroup.Item>Username: {userInfo.username}</ListGroup.Item>
					<ListGroup.Item>Password: *****</ListGroup.Item>
					<ListGroup.Item>Email: {userInfo.email}</ListGroup.Item>
					<ListGroup.Item>Birthday: {userInfo.birthday}</ListGroup.Item>
					{/*<ListGroup.Item>Favorite Movies: 
						<ul>{userInfo.favorites.map(f => 
							<li key={f}>{movies.find(m => m._id === f).title} 
								<Button variant="danger" size="sm" onClick={() => this.deleteFavorite(f)}>Remove</Button>
							</li>)}
						</ul>
					</ListGroup.Item>*/}
				</ListGroup>
					<Link to={`/users/update/${localStorage.getItem('user')}`}>
						<Button>Edit</Button>
					</Link>
					<Button variant="danger" onClick={() => this.deleteUser()}>Delete User</Button>
					<Link to={`/`}>
						<Button variant="info">Back</Button>
					</Link>
			</div>
		)
	}
}

let mapStateToProps = state => {
	return {
		user: state.user,
		movies: state.movies
	}
}

export default connect(mapStateToProps)(ProfileView);