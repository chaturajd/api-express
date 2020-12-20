require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const firebase = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_SECRET_PATH);

const db = require('./database/auth/index')

const app = express();

//Middlewares
app.use(express.json());


//Routes
app.post('/login', verifyFirebaseUid, (req, res) => {

    const userId = req.uid;
    const user = { id: userId, appId: "organicnom" };

    const accessToken = genarateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

    db.storeRefreshToken(refreshToken, userId);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.statusCode(401);
    const token = await db.getRefreshToken(refreshToken);
    if (token == null) return res.statusCode(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = genarateAccessToken({ id: user.id });
        res.json({ accessToken: accessToken });
    });
    // if(refreshToken == await db.getRefreshToken(refreshToken))
});

app.delete('/logout', async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.statusCode(401);
    const deleted = await db.deleteRefreshToken(refreshToken);

    if (deleted) return res.statusCode(200);

    return res.statusCode(401);
});

function verifyFirebaseUid(req, res, next) {
    firebase.auth().verifyIdToken(req.body.uid).then((decodedToken) => {
        const user = decodedToken.uid;
        console.log(`Decoded Firebase Id : ${decodedToken}`);
        req.uid = user;
        next();
    }).catch((error) => {
        console.log(error);
    });
}

function genarateAccessToken(userId) {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3600s' });
}

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://test-95deb.firebaseio.com"
});

app.listen(4000, () => console.log("Server Started"));