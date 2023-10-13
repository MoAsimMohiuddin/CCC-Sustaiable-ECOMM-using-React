const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const cors=require('cors');
const app=express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization, Access-Control-Allow-Origin',
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/register', require('./Routes/register'));
app.use('/login', require('./Routes/login'));
// app.use('/api', require('./Routes/api'));
// app.use('/verifytoken', require('./Routes/verifyToken'));

app.listen(process.env.PORT, ()=>{
    console.log("Listening on Port 4000");
})