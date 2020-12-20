const db = require('../index');
const queries = require('./queries');

let auth = {};

auth.storeRefreshToken = (refreshToken, userId) => {
    return new Promise((resolve, reject) => {
        db.pool.query(`INSERT INTO auth_tokens (refresh_token,user_id) VALUES ('${refreshToken}','${userId}');`, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

auth.getRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        db.pool.query(`SELECT * FROM auth_tokens WHERE refresh_token='${refreshToken}'`, (err, results) => {
            if (err) return reject(err);
            if (results.length < 1) return resolve(null);
            return resolve(results[0]['refresh_token']);
        });
    });
};

auth.deleteRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        db.pool.query(`DELETE FROM auth_tokens WHERE refresh_token = '${refreshToken}';`, (error, results, fields) => {
            if (error) throw error;
            if (results.affectedRows > 0) return resolve(true);
            return resolve(false);
        });
    });
};

module.exports = auth;