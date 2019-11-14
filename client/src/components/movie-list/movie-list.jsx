import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MovieList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !=='') {
		filteredMovies = movies.filter(m => m.title.includes(visibilityFilter));
	}

	if (!movies) return <div className="main-view"/>;

	return <div className="movie-list">
		<Row><Col xl={3} lg={4} md={6} sm={12}><VisibilityFilterInput visibilityFilter={visibilityFilter}/></Col></Row>
		<Row>{filteredMovies.map(m => <Col key={m._id} xl={3} lg={4} md={6} sm={12}><MovieCard key={m._id} movie={m}/></Col>)}</Row>
	</div>;
}

export default connect(mapStateToProps)(MovieList);