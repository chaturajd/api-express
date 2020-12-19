const db = require('../index');
const queries = require('./queries');

let organicnom = {};

organicnom.allExercises = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.allExercises, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

organicnom.allLessons = () => {
    return new Promise((resolve, reject) => {
        db.pool.query(queries.allLessons, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

module.exports = organicnom;