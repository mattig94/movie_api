const express = require('express');
  morgan = require('morgan')

const app = express();

//Top 10 movies
let topMovies = [
  {
    title: 'Pride and Prejudice',
    director: 'Joe Wright',
    releaseYear: '2005'
  },
  {
    title: 'What a Girl Wants',
    director: 'Dennie Gordon',
    releaseYear: '2003'
  },
  {
    title: '10 Things I Hate About You',
    director: 'Gil Junger',
    releaseYear: '1999'
  },
  {
    title: 'Clueless',
    director: 'Amy Heckerling',
    releaseYear: '1995'
  },
  {
    title: '13 Going on 30',
    director: 'Gary Winick',
    releaseYear: '2004'
  },
  {
    title: '27 Dresses',
    director: 'Anne Fletcher',
    releaseYear: '2008'
  },
  {
    title: 'The Devil Wears Prada',
    director: 'David Frankel',
    releaseYear: '2006'
  },
  {
    title: 'Mean Girls',
    director: 'Mark Waters',
    releaseYear: '2004'
  },
  {
    title: 'Legally Blonde',
    director: 'Robert Luketic',
    releaseYear: '2001'
  },
  {
    title: 'Miss Congeniality',
    director: 'Donald Petrie',
    releaseYear: '2000'
  }
]

//LOG request data
app.use(morgan('common'));

//GET requests
app.get('/movies', function(req, res) {
  res.json(topMovies)
});
app.get('/', function(req, res) {
  res.send('Welcome to myFlix!')
});
app.use(express.static('public'));

//ERROR handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

//LISTEN for requests
app.listen(8080, () =>
  console.log('myFlix is running on Port 8080')
);
