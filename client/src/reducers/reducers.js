import { combineReducers } from 'redux';

import { SET_USER, SET_FILTER, SET_MOVIES, SET_GENRES, SET_DIRECTORS } from '../actions/actions';

function user(state = [], action) {
	switch (action.type) {
		case SET_USER:
			return action.value;
		default:
			return state;
	}
}

function visibilityFilter(state = '', action) {
	switch (action.type) {
		case SET_FILTER:
			return action.value;
		default:
			return state;
	}
}

function movies(state = [], action) {
	switch (action.type) {
		case SET_MOVIES:
			return action.value;
		default:
			return state;
	}
}

function genres(state = [], action) {
	switch (action.type) {
		case SET_GENRES:
			return action.value;
		default:
			return state;
	}
}

function directors(state = [], action) {
	switch (action.type) {
		case SET_DIRECTORS:
			return action.value;
		default:
			return state;
	}
}

const moviesApp = combineReducers({
	user,
	visibilityFilter,
	movies,
	genres,
	directors
});

export default moviesApp;