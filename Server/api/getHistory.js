const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const getHistory=async (req, res)=>{
    console.log(req.body);
    const email=req.body.email;

    const usersSchema=new mongoose.Schema({
        email: String,
        password: String,
        patagoniacart: Array,
        tentreecart: Array,
        boughtItems: Object
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

    const boughtItems=userData.boughtItems;
    const pat=boughtItems.patagonia;
    const ten=boughtItems.tentree;

    const patArray=[];
    const tenArray=[];

    for(let i in pat) {
        const product=await patagoniaModel.findOne({id: {$eq: pat[i]}});
        patArray.push(product);
    }
    for(let i in ten) {
        const product=await tentreeModel.findOne({id: {$eq: ten[i]}});
        tenArray.push(product);
    }

    // console.log("patArray="+patArray);
    // console.log("tenArray="+tenArray);

    const result={patagonia: patArray, tentree: tenArray};

    res.status(200);

    res.json({result})
};

module.exports=getHistory;