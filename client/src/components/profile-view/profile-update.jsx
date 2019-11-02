import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";

import './profile-view.scss';

export function ProfileUpdate(props) {
	const [ username, updateUsername ] = useState('');
	const [ password, updatePassword ] = useState('');
	const [ email, updateEmail ] = useState('');
	const [ birthday, updateBirthday ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}
			 `, {
			username: username,
			email: email,
			birthday: birthday,
			password: password
		})
		.then(response => {
			const data = response.data;
			console.log(data);
			window.open('/', '_self');
		})
		.catch(e => {
			console.log('There was an issue updating your user information')
		});
	};

	return (
		<Form>
			<Form.Group>
				<Form.Label>Username:</Form.Label>
				<Form.Control type="text" placeholder="New Username" value={username} onChange={e => updateUsername(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type="password" placeholder="New Password" value={password} onChange={e =>updatePassword(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control type="email" placeholder="Update Email" value={email} onChange={e => updateEmail(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Birthday:</Form.Label>
				<Form.Control type="date" value={birthday} onChange={e => updateBirthday(e.target.value)} />
			</Form.Group>
			<Form.Group>
				<Button type="submit" onClick={handleSubmit}>Update</Button>
			</Form.Group>
			<div>
				<Link to={`/users/${localStorage.getItem('user')}`}>
					<Button variant="secondary">Cancel</Button>
				</Link>
			</div>
		</Form>
	);
}
