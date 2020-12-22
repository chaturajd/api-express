let queries = {};

queries.allExercises = "SELECT * FROM apps_videos WHERE type='M'";
queries.allLessons = "SELECT * FROM apps_videos WHERE type='L'";


module.exports = queries;
