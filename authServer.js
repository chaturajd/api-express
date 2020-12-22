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
// app.post('/login', (req, res) => {


    const userId = req.uid;
    const appId = "organicnom"

    const accessToken = genarateAccessToken(userId,appId);
    const refreshToken = jwt.sign({"userId" : userId,"appId":appId}, process.env.REFRESH_TOKEN_SECRET);

    db.storeRefreshToken(refreshToken, userId);

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.post('/token', async (req, res) => {
    console.log("Token refresh requested")
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.statusCode(401);
    const token = await db.getRefreshToken(refreshToken);
    if (token == null) return res.status(403).send()
    //  res.statusCode(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, info) => {
        if (err) return res.sendStatus(403);
        console.log(info.userId);
        const accessToken = genarateAccessToken( info.userId,info.appId );
        res.json({ accessToken: accessToken });
    });
    
    // if(refreshToken == await db.getRefreshToken(refreshToken))
});

app.delete('/logout', async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.statusCode(401);
    const deleted = await db.deleteRefreshToken(refreshToken);

    if (deleted) return res.statusCode(204);

    return res.statusCode(401);
});

function verifyFirebaseUid(req, res, next) {

    console.log(req.body);

    firebase.auth().verifyIdToken(req.body.token).then((decodedToken) => {
        const user = decodedToken.uid;
        console.log(`Decoded Firebase email : ${decodedToken.email}`);
        req.uid = user;
        next();
    }).catch((error) => {
        console.log(error);
    });
}

function genarateAccessToken(userId,appId) {
    const info = {
        "userId" :userId,
        "appId" : appId,
    };

    return jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12s' });
}

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://test-95deb.firebaseio.com"
});

app.listen(4000, () => console.log("Server Started"));