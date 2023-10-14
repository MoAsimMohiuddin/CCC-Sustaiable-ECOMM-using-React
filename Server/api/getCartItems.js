const mongoose=require('mongoose');
const url='mongodb://127.0.0.1:27017/cognidaEcommDB';
mongoose.connect(url);

const getCartItems=async (req, res)=>{
    console.log(req.body);
    const email=req.body.email;

    const usersSchema=new mongoose.Schema({
        email: String,
        password: String,
        patagoniacart: Array,
        tentreecart: Array
    });
    const productsSchema=new mongoose.Schema({
        id: Number,
        name: String,
        desc: String,
        price: Number
    });

    const userModel=mongoose.models['users'] || mongoose.model('users', usersSchema);
    const patagoniaModel=mongoose.models['patagonias'] || mongoose.model('patagonias', productsSchema);
    const tentreeModel=mongoose.models['tentrees'] || mongoose.model('tentrees', productsSchema);
    
    const userData=await userModel.findOne({email: {$eq: email}});
    console.log('userData is');
    console.log(userData);

    if (!userData) {
        console.log('No user data found');
        return res.status(404).json({ error: 'User data not found' });
    }

    const patagoniaCart=userData.patagoniacart;
    const tentreeCart=userData.tentreecart;

    console.log("patagoniaCart: ", patagoniaCart);
    console.log("tentreeCart:", tentreeCart);

    const prodArray=[];
    let price=0;

    for(let i=0; i<patagoniaCart.length; i++) {
        const product=await patagoniaModel.findOne({id: {$eq: patagoniaCart[i]}});
        prodArray.push({name: product.name, brand: 'patagonia', id: patagoniaCart[i]});
        price+=product.price;
    }

    for(let i=0; i<tentreeCart.length; i++) {
        const product=await tentreeModel.findOne({id: {$eq: tentreeCart[i]}});
        prodArray.push({name: product.name, brand: 'tentree', id: tentreeCart[i]});
        price+=product.price;
    }

    console.log(prodArray);

    res.status(200);
    res.json({result: prodArray, total: price});
};

module.exports=getCartItems;