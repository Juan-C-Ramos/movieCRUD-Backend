const { getAll, create, getOne, remove, update, setGenres, setDirectors, setActors } = require('../controllers/movie.controller');
const express = require('express');

const movieRouter = express.Router();

// Get and Create a movie (Routes Static)
movieRouter.route('/')
    .get(getAll)
    .post(create);

// Set Genres a movie
movieRouter.route('/:id/genres')
    .post(setGenres)

// Set Actors a movie
movieRouter.route('/:id/actors')
    .post(setActors)

//Set Directors a movie
movieRouter.route('/:id/directors')
    .post(setDirectors)
    
// Get, delete, and update a movie (Routes Dinamic)
movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = movieRouter;