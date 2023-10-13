const express=require('express');
const router=express.Router();
const handleToken=require('./../Controllers/handleToken');

router.post('/', handleToken);

module.exports=router;