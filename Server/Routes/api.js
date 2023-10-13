const express=require('express');
const router=express.Router();
const getProducts=require('./../api/getProducts');

router.get('/', getProducts);

module.exports=router;