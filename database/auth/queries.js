let queries = {};

queries.storeRefreshToken = (token,userId) => {
    return `INSERT INTO 'auth_tokens' ('refresh_token','user_id') VALUES ('${token}','${userId}');`;
}

queries.getRefreshToken = (userId) => {
    return `SELECT * FROM 'auth_tokens' WHERE user_id='${userId}'`;
}

// queries.getRefreshToken = "SELECT * FROM auth_tokens WHERE type='M' LIMIT 5";
queries.storeRefreshToken = "SELECT * FROM apps_videos WHERE type='L' LIMIT 5";


module.exports = queries;
