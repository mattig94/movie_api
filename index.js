const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
  mongoose = require('mongoose');

//to host client side
const path = require('path');

const Models = require('./server/models.js');

const Movies = Models.Movies;
const Users = Models.Users;
const Genres = Models.Genres;
const Directors = Models.Directors;

const app = express();

//Cross-Origin Resource Sharing via express
const cors = require('cors');
app.use(cors());

//server side validation
const validator = require('express-validator');
app.use(validator());

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://admin:69KVSUWOlc70bQJD@cluster0-avxc3.mongodb.net/myFlixDB?retryWrites=true&w=majority', {useNewUrlParser: true});

//static files come from public folder
app.use(express.static('dist'));

//to host client side
app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});
app.use('/client', express.static(path.join(__dirname, 'dist')));
app.get ('/client/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
}); 

//POST and PUT request body info is sent back as json
app.use(bodyParser.json());
//login POST
var auth = require('./server/auth')(app);
//PASSPORT
const passport = require('passport');
require('./server/passport');

//LOG request data
app.use(morgan('common'));

//GET requests
/**
 * @function getMovies get a list of all movies
 * @description
 * endpoint URL: /movies
 * method: GET
 * query params: none
 * example request: 
 * getMovies(token) {
 * 		axios.get('https://my-millennial-movies.herokuapp.com/movies', {
 * 			headers: { Authorization: `Bearer ${token}` }
 * 		})
 * 		.then(response => {
 *       this.props.setMovies(response.data);
 *       		})
 * 		.catch(function(error) {
 * 			console.log(error);
 * 		});
 * }
 * example response:
 * @param {Array} genres
 * @param {string} _id
 * @param {string} title
 * @param {string} description
 * @param {string} director
 * @param {string} releaseYear
 * @param {string} imgURL
 * @param {boolean} featured 
 */
app.get('/movies', passport.authenticate('jwt', {session: false}), function(req, res) {
  Movies.find()
  .then(function(movies) {
    res.status(201).json(movies);
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
/**
 * @function getDirectors get a list of all directors
 * @description
 * endpoint URL: /directors
 * method: GET
 * query params: none
 * example request: 
 * getDirectors(token) {
 * 		axios.get('https://my-millennial-movies.herokuapp.com/directors', {
 * 			headers: { Authorization: `Bearer ${token}` }
 * 		})
 * 		.then(response => {
 *       this.props.setDirectors(response.data);
 *       		})
 * 		.catch(function(error) {
 * 			console.log(error);
 * 		});
 * }
 * example response:
 * @param {string} _id
 * @param {string} name
 * @param {string} bio
 * @param {string} birthYear
 * @param {string} deathYear
 */
app.get('/directors', passport.authenticate('jwt', {session: false}), function(req, res) {
  Directors.find()
  .then(function(directors) {
    res.status(201).json(directors);
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
/**
 * @function getGenres get a list of all genres
 * @description
 * endpoint URL: /genres
 * method: GET
 * query params: none
 * example request: 
 * getGenres(token) {
 * 		axios.get('https://my-millennial-movies.herokuapp.com/genres', {
 * 			headers: { Authorization: `Bearer ${token}` }
 * 		})
 * 		.then(response => {
 *       this.props.setGenres(response.data);
 *       		})
 * 		.catch(function(error) {
 * 			console.log(error);
 * 		});
 * }
 * example response:
 * @param {string} _id
 * @param {string} name
 * @param {string} description
 */
app.get('/genres', passport.authenticate('jwt', {session: false}), function(req, res) {
  Genres.find()
  .then(function(genres) {
    res.status(201).json(genres);
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//home page
// app.get('/', function(req, res) {
//   res.send('Welcome to myFlix!')
// });
app.use(express.static(path.resolve('client/build/dist')));
//movie by title
/*app.get('/movies/:title', passport.authenticate('jwt', {session: false}), function(req, res) {
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});*/
//movie by id
app.get('/movies/:movieID', function(req, res) {
  Movies.findOne({_id: req.params.movieID})
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//genre details by name
app.get('/genres/:name', passport.authenticate('jwt', {session: false}), function(req, res) {
  Genres.findOne({name: req.params.name})
  .then(function(genre) {
    res.json(genre)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//genre details by id
app.get('/genres/:genreID', passport.authenticate('jwt', {session: false}), function(req, res) {
  Genres.findOne({_id: req.params.genreID})
  .then(function(genre) {
    res.json(genre)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//director details by name
// app.get('/directors/:name', passport.authenticate('jwt', {session: false}), function(req, res) {
//   Directors.findOne({name: req.params.name})
//   .then(function(director) {
//     res.json(director)
//   })
//   .catch(function(error) {
//     console.error(error);
//     res.status(500).send("Error: " + error);
//   });
// });
//director details by id
app.get('/directors/:directorID', function(req, res) {
  Directors.findOne({_id: req.params.directorID})
  .then(function(director) {
    res.json(director)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//list of all users
app.get('/users', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//details about a single user
app.get('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOne({username: req.params.username})
  .then(function(user) {
    res.json(user)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//POST requests
/**
 * @function handleSubmit create a new user
 * @description
 * endpoint URL: /users
 * method: POST
 * query params:
 * @param {string} username
 * @param {string} email
 * @param {date} birthday
 * @param {string} password
 * example request: 
 * handleSubmit = (e) => {
 * 		e.preventDefault();
 * 		axios.post('https://my-millennial-movies.herokuapp.com/users', {
 * 			username: username,
 * 			email: email,
 * 			birthday: birthday,
 * 			password: password
 * 		})
 * 		.then(response => {
 * 			const data = response.data;
 * 			console.log(data);
 * 			window.open('/client/login', '_self');
 * 		})
 * 		.catch(e => {
 * 			console.log('error registering the user')
 * 			throw e;
 * 		});
 * 	};
 * example response:
 * @param {Array} favorites
 * @param {string} _id
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {date} birthday
 */
app.post('/users', function(req, res) {
  //validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username contains non alphanumeric characters which are not allowed').isAlphanumeric();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  var errors = req.validationErrors();
  if(errors) {
    return res.status(422).json({errors: errors});
  }
  //hashing password
  var hashedPassword = Users.hashPassword(req.body.password);
  //creating the new user
  Users.findOne({username: req.body.username})
  .then(function(users) {
    if (users) {
      return res.status(400).send(req.body.username + " already exists");
    } else {
      Users
      .create({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday
      })
      .then(function(user) {res.status(201).json(user)} )
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
/**
 * @function addFavorite add a movie to user's favorites
 * @description
 * endpoint URL: /users/:username/favorites/:movieID
 * method: POST
 * query params:
 * @param {string} username
 * @param {ObjectId} _id movieID
 * example request: 
 * addFavorite(movieID) {
 *     axios.post(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movieID}`, null, {
 *       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 *     })
 *     .then(response => {
 *       alert("Movie has been added to favorites");
 *     })
 *     .catch(e => {
 *       console.log('There was an issue adding movie to favorites')
 *     }); 
 *   }
 * example response:
 * @param {Array} favorites list of user's favorites
 */
app.post('/users/:username/favorites/:movieID', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOneAndUpdate(
    {username: req.params.username},
    {$push: {favorites: req.params.movieID}},
    {new: true}
  )
  .then(function(updatedUser) {
    res.json(updatedUser)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//PUT requests
/**
 * @function handleSubmit update user's info
 * @description
 * endpoint URL: /users/:username
 * method: PUT
 * query params:
 * @param {string} username
 * @param {string} email
 * @param {date} birthday
 * @param {string} password
 * example request: 
 * handleSubmit = (e) => {
 * 		e.preventDefault();
 * 		axios.put(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}`, {
 * 			username: username,
 * 			password: password,
 * 			email: email,
 * 			birthday: birthday,
 * 			favorites: []
 * 			}, {
 * 			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 * 		})
 * 		.then(response => {
 * 			const data = response.data;
 * 			console.log(data);
 * 			alert("Your user info has been updated");
 * 			window.open(`/users/${localStorage.getItem('user')}`, '_self');
 * 		})
 * 		.catch(e => {
 * 			console.log('There was an issue updating your user information')
 * 		});
 * 	};
 * example response:
 * @param {Array} favorites
 * @param {string} _id
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {date} birthday
 */
app.put('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  //validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('username', 'Username contains non alphanumeric characters which are not allowed').isAlphanumeric();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  var errors = req.validationErrors();
  if(errors) {
    return res.status(422).json({errors: errors});
  }
  //hashing password
  var hashedPassword = Users.hashPassword(req.body.password);
  //updating actual user info
  Users.findOneAndUpdate(
    {username: req.params.username},
    {$set:
      {
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        birthday: req.body.birthday
      }
    },
    {new: true}
  )
  .then(function(updatedUser) {
    res.json(updatedUser)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//DELETE requests
/**
 * @function deleteFavorite delete favorite movie from user
 * @description
 * endpoint URL: /users/:username/favorites/:movieID
 * method: DELETE
 * query params:
 * @param {string} username
 * @param {ObjectId} _id movieID
 * example request: 
 * deleteFavorite(f) {
 * 		axios.delete(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${f}`, {
 * 			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 * 		})
 * 		.then(response => {
 * 			alert("Movie has been removed from favorites");
 * 			window.open(`client/users/${localStorage.getItem('user')}`, '_self');
 * 		})
 * 		.catch(e => {
 * 			console.log('There was an issue removing movie from favorites')
 * 		});	
 * 	}
 * example response:
 * @param {Array} favorites updated list of user's favorites
 */
app.delete('/users/:username/favorites/:movieID', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOneAndUpdate(
    {username: req.params.username},
    {$pull: {favorites: req.params.movieID}},
    {new: true}
  )
  .then(function(updatedUser) {
    res.json(updatedUser)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
/**
 * @function deleteUser delete user by username
 * @description
 * endpoint URL: /users/:username
 * method: DELETE
 * query params:
 * @param {string} username
 * example request: 
 * deleteUser() {
 * 		axios.delete(`https://my-millennial-movies.herokuapp.com/users/${localStorage.getItem('user')}`, {
 * 			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
 * 		})
 * 		.then(response => {
 * 			alert("Your account has been deleted");
 * 			localStorage.removeItem('token');
 * 			localStorage.removeItem('user');
 * 			window.open('/client/login', '_self');
 * 		})
 * 		.catch(e => {
 * 			console.log('There was an issue deleting your account')
 * 		});	
 * 	}
 * example response: 'Your account has been deleted'
 */
app.delete('/users/:username', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOneAndRemove({username: req.params.username})
  .then(function(user) {
    if(!user) {
      res.status(400).send(req.params.username + " was not found");
    } else {
      res.status(200).send(req.params.username + " was deleted");
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

//ERROR handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

//LISTEN for requests
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log('Listening on Port 3000');
});
