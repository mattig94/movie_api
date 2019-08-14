const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  director: {type: mongoose.Schema.Types.ObjectId, ref: 'Directors'}, 
  releaseYear: String,
  imgURL: String,
  featured: Boolean,
  genres: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genres'}]
});

var userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  birthday: Date,
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movies'}]
});

var genreSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true}
});

var directorSchema = mongoose.Schema({
  name: {type: String, required: true},
  bio: {type: String, required: true},
  birthYear: {type: String, required: true},
  deathYear: String
});

var Movies = mongoose.model('Movies', movieSchema);
var Users = mongoose.model('Users', userSchema);
var Genres = mongoose.model('Genres', genreSchema);
var Directors = mongoose.model('Directors', directorSchema);

module.exports.Movies = Movies;
module.exports.Users = Users;
module.exports.Genres = Genres;
module.exports.Directors = Directors;
