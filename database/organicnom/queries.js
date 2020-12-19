let queries = {};

queries.allExercises = "SELECT * FROM apps_videos WHERE type='M' LIMIT 5";
queries.allLessons = "SELECT * FROM apps_videos WHERE type='L' LIMIT 5";


module.exports = queries;
