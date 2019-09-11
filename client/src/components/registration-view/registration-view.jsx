import React, { useState } from 'react';

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
		<form>
			<label>
				Username: <input type="text" value={username} onChange={e => addUsername(e.target.value)} />
			</label>
			<label>
				Email: <input type="email" value={email} onChange={e => addEmail(e.target.value)} />
			</label>
			<label>
				Birthday: <input type="date" value={birthday} onChange={e => addBirthday(e.target.value)} />
			</label>
			<label>
				Password: <input type="text" value={password} onChange={e => addPassword(e.target.value)} />
			</label>
			<button type="button" onClick={handleSubmit}>Register</button>
		</form>
	);
}