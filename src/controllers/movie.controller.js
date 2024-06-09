const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');

//Get all movies
const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll();
    return res.json(results);
});

//Create a movie
const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

// Get one movie
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

// Delete a movie
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

// Update a movie
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// Set Genre a Movie
const setGenres = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    await movie.setGenres(req.body);

    const genres = await movie.getGenres();
    return res.json(genres);
});

// Set Actors a Movie
const setActors = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    await movie.setActors(req.body);

    const actors = await movie.getActors();
    return res.json(actors);
});

// Set Directors a Movie
const setDirectors = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    await movie.setDirectors(req.body);

    const directors = await movie.getDirectors();
    return res.json(directors);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenres,
    setActors,
    setDirectors
}