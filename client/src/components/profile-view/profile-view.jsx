import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

// import '/profile-view.scss';

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
		axios.get(`https://my-millennial-movies.herokuapp.com/users/${user}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response =>{
			this.setState({
				userInfo: response.data
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}

	render () {
		const { userInfo } =this.state;

		return(
			<div className="profile-view">
				<h3>My Profile</h3>
				<ListGroup>
					<ListGroup.Item>Username: {userInfo.username}</ListGroup.Item>
					<ListGroup.Item>Password:</ListGroup.Item>
					<ListGroup.Item>Email: {userInfo.email}</ListGroup.Item>
					<ListGroup.Item>Birthday: {userInfo.birthday}</ListGroup.Item>
				</ListGroup>
				<Link to={`/`}>
					<Button variant="info">Back</Button>
				</Link>
			</div>
		)
	}
}

