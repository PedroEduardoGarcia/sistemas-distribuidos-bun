import { Database } from 'bun:sqlite';

export interface Movie {
  id?: number;
  name: string;
  author: string;
}

export class MoviesDatabase {
  private db: Database;

  constructor() {
      this.db = new Database('movies.db');
      // Initialize the database
      this.init()
          .then(() => console.log('Database initialized'))
          .catch(console.error);
  }

  // Get all movies
  async getMovies() {
      return this.db.query('SELECT * FROM movies').all();
  }

  // Delete a movie
  async deleteMovie(id: number) {
      return this.db.run(`DELETE FROM movies WHERE id = ${id}`)
  }

  async getMovie(id: number) {
    return this.db.query(`SELECT * FROM movies WHERE id=${id}`).get() as Movies;
  }

  // Initialize the database
  async init() {
    return this.db.run('CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT)');
  }

}
