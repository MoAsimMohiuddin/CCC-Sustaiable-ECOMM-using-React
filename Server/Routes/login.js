const express=require('express');
const router=express.Router();
const handleLogin=require('./../Controllers/handleLogin');

router.post('/', handleLogin);

module.exports=router;