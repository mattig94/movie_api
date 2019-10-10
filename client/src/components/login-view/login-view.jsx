import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('https://my-millennial-movies.herokuapp.com/login', {
			username: username,
			password: password
		})
		.then(response => {
			const data = response.data;
			props.onLoggedIn(data);
		})
		.catch(e => {
			console.log('no such user')
		});
	};

	return (
		<Form>
				<Form.Group>
					<Form.Label>Username:</Form.Label>
					<Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label> 
					<Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
				</Form.Group>
				<Form.Group>
					<Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
				</Form.Group>
				<div>
					<Link to={`/register`}>
						<Button variant="secondary">Not Registered?</Button>
					</Link>
				</div>
		</Form>


	);
}

LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
};