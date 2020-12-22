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


organicnom.updatePointers = (userId, lessonPointer, exercisePointer) => {
    return new Promise((resolve, reject) => {
        db.pool.query("INSERT INTO organicnom_pointers (user_id,lesson_pointer, exercise_pointer) VALUES (?,?,?) ON DUPLICATE KEY UPDATE lesson_pointer = VALUES(lesson_pointer), exercise_pointer = VALUES (exercise_pointer), last_updated_at = current_timestamp()", [userId, lessonPointer, exercisePointer, lessonPointer, exercisePointer], (err, results) => {
            if (err) {
                console.log(err);
                return reject(false);
            }
            return resolve(true)
        });
    });
}

organicnom.getPointers = (userId) => {
    return new Promise((resolve, reject) => {
        db.pool.query("SELECT * FROM organicnom_pointers WHERE user_id=?", [userId], (err, results) => {
            if (err) return reject(err);
            return resolve(resolve);
        });
    });
}

organicnom.test = "qer";


module.exports = organicnom;