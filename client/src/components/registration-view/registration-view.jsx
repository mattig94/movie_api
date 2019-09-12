import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
	const [ username, addUsername ] = useState('');
	const [ password, addPassword ] = useState('');
	const [ email, addEmail ] = useState('');
	const [ birthday, addBirthday ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, email, birthday, password);
		/*Send a request for authentication*/
		props.onLoggedIn(username);
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
		</Form>
	);
}