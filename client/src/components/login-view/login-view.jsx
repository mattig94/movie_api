import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/*Send a request for authentication*/
		props.onLoggedIn(username);
	};

	const signUp = (e) => {
		e.preventDefault();
		props.newRegistration();
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
					<Button variant="secondary" onClick={signUp}>Not Registered?</Button>
				</div>
		</Form>


	);
}

LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
	newRegistration: PropTypes.func.isRequired
};