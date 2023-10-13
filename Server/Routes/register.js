const express=require('express');
const router=express.Router();
const handleRegister=require('./../Controllers/handleRegister');

router.post('/', handleRegister);

module.exports=router;