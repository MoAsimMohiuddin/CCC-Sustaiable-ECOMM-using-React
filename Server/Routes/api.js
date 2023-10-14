const express=require('express');
const router=express.Router();
const getProducts=require('./../api/getProducts');
const addtocart=require('./../api/addToCart');
const getCartItems=require('./../api/getCartItems');
const removeItem=require('./../api/removeCartItem');
const handleBuy=require('./../api/handleBuy');
const getHistory=require('./../api/getHistory');

router.get('/', getProducts);
router.post('/addtocart', addtocart);
router.post('/getcart', getCartItems);
router.post('/removeitem', removeItem);
router.post('/buy', handleBuy);
router.post('/history', getHistory);

module.exports=router;