import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import './registration-view.scss';

export function RegistrationView(props) {
	const [ username, addUsername ] = useState('');
	const [ password, addPassword ] = useState('');
	const [ email, addEmail ] = useState('');
	const [ birthday, addBirthday ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('https://my-millennial-movies.herokuapp.com/users', {
			username: username,
			email: email,
			birthday: birthday,
			password: password
		})
		.then(response => {
			const data = response.data;
			console.log(data);
			props.onLoggedIn(data);
			window.open('/client', '_self');
		})
		.catch(e => {
			console.log('error registering the user')
		});
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control type="text" placeholder="Create a Username" value={username} onChange={e => addUsername(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => addEmail(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Birthday:</Form.Label>
				<Form.Control type="date" value={birthday} onChange={e => addBirthday(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type="password" placeholder="Create a Password" value={password} onChange={e => addPassword(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Button type="submit" onClick={handleSubmit}>Register</Button>
			</Form.Group>
			<div>
				<Link to={`/login`}>
					<Button variant="secondary">Already Registered?</Button>
				</Link>
			</div>
		</Form>
	);
}

RegistrationView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
};