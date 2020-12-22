require('dotenv').config();
const express = require('express');

const jwt = require('jsonwebtoken'); 

const organicnomRouter = require('./routes/organicnom.js');

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use('/organicnom',authenticateToken,organicnomRouter);

// app.post('/login',(req,res)=>{

//     const username = req.body.username;
//     const user = {name:username};

//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//     res.json({accessToken:accessToken});
// });


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,info)=>{
        if(err) return res.sendStatus(403);
        console.log(info);
        req.info = info;
        next();
    });
}

app.listen(3000, () => console.log("Server Started"));