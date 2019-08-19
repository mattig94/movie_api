const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
  mongoose = require('mongoose');

const Models = require('./models.js');

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
app.use(express.static('public'));

//POST and PUT request body info is sent back as json
app.use(bodyParser.json());
//login POST
var auth = require('./auth')(app);
//PASSPORT
const passport = require('passport');
require('./passport');

//LOG request data
app.use(morgan('common'));

//GET requests
//all movies
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
//home page
app.get('/', function(req, res) {
  res.send('Welcome to myFlix!')
});
//movie by title
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), function(req, res) {
  Movies.findOne({title: req.params.title})
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//movie by id
// app.get('/movies/:movieID', function(req, res) {
//   Movies.findOne({_id: req.params.movieID})
//   .then(function(movie) {
//     res.json(movie)
//   })
//   .catch(function(error) {
//     console.error(error);
//     res.status(500).send("Error: " + error);
//   });
// });
//genre details
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
//director details by name
app.get('/directors/:name', passport.authenticate('jwt', {session: false}), function(req, res) {
  Directors.findOne({name: req.params.name})
  .then(function(director) {
    res.json(director)
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});
//director details by id
// app.get('/directors/:directorID', function(req, res) {
//   Directors.findOne({_id: req.params.directorID})
//   .then(function(director) {
//     res.json(director)
//   })
//   .catch(function(error) {
//     console.error(error);
//     res.status(500).send("Error: " + error);
//   });
// });
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
//creating a new user
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
//add movie to user favorites
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
//update a users info
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
//delete favorite movie from user
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
//delete user by username
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
