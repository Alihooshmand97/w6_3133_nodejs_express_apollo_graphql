const mongoose = require('mongoose');

// Create a schema for the movie model
const movieSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true // Name of the movie (required field)
  },
  director_name: { 
    type: String, 
    required: true // Name of the director (required field)
  },
  production_house: { 
    type: String, 
    required: true // Production house (required field)
  },
  release_date: { 
    type: String, 
    required: true // Release date of the movie (required field)
  },
  rating: { 
    type: Number, 
    required: true // Rating of the movie (required field)
  }
});

// Create and export the Movie model based on the movie schema
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
