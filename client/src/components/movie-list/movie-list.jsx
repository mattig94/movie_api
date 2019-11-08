import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

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
		<VisibilityFilterInput visibilityFilter={visibilityFilter}/>
		{filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
	</div>;
}

export default connect(mapStateToProps)(MovieList);