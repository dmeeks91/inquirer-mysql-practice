const mysql = require("mysql2");
require("dontenv").config();

class MovieDB {
    constructor() {
        this.db = mysql.createConnection({
            host: "localhost",
            // Your username
            user: process.env.DB_USER,
            // Your password
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })

        this.db.connect(function (err) {
            if (err) throw err;
        });
    }

    viewAllMovies() {
        const sql = `SELECT id, movie_name AS title FROM movies`;
        return this.db.promise().query(sql);
    }

    addMovie(movie_name) {
        const sql = `INSERT INTO movies (movie_name)
            VALUES (?)`;
        const params = [movie_name];
        return this.db.promise().query(sql, params);
    }

    removeMovie(movie_id) {
        const sql = `DELETE FROM movies WHERE id = ?`;
        const params = [movie_id];
        return this.db.promise().query(sql, params);
    }

    viewAllReviews() {
        const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
        return this.db.promise().query(sql)
    }
}
module.exports = new MovieDB();