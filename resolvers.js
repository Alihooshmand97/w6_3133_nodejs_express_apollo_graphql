const movies = require('./models/Movies'); // Import your movie data or database logic

const resolvers = {
  Query: {
    movies: () => {
      return movies; // Return the list of movies (this can be fetched from a database or static data)
    },
    movie: (parent, args) => {
      return movies.find(movie => movie.id === args.id); // Find a movie by ID
    },
  },

  Mutation: {
    addMovie: (parent, args) => {
      const newMovie = {
        id: `${movies.length + 1}`, // Simple logic for generating an ID
        name: args.name,
        director_name: args.director_name,
        production_house: args.production_house,
        release_date: args.release_date,
        rating: args.rating,
      };
      movies.push(newMovie);
      return newMovie; // Return the newly added movie
    },

    updateMovie: (parent, args) => {
      const movieIndex = movies.findIndex(movie => movie.id === args.id);
      if (movieIndex === -1) return null; // Movie not found

      const updatedMovie = {
        ...movies[movieIndex],
        ...args, // Update fields based on provided arguments
      };
      movies[movieIndex] = updatedMovie;
      return updatedMovie; // Return the updated movie
    },

    deleteMovie: (parent, args) => {
      const movieIndex = movies.findIndex(movie => movie.id === args.id);
      if (movieIndex === -1) return null; // Movie not found

      const deletedMovie = movies.splice(movieIndex, 1);
      return deletedMovie[0]; // Return the deleted movie
    },
  },
};

module.exports = resolvers;
