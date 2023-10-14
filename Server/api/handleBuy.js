const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const handleBuy=async (req, res)=>{
    const email = req.body.email;

    const schema = new mongoose.Schema({
        email: String,
        password: String,
        patagoniacart: Array,
        tentreecart: Array,
        boughtItems: Object
      });
    
      const model = mongoose.models["users"] || mongoose.model("users", schema);
    
      let userData = await model.findOne({ email: { $eq: `${email}` } });

      const history={};

      history.patagonia=userData.patagoniacart;
      history.tentree=userData.tentreecart;

      if(!userData.boughtItems) {
        await model.replaceOne(
            { email: email },
            {
              _id: userData["_id"],
              email: userData.email,
              password: userData.password,
              __v: userData["__v"],
              patagoniacart: [],
              tentreecart: [],
              boughtItems: history
            }
          );
      }else{
        console.log("Histroy is")
        console.log(userData.boughtItems.patagonia);
        console.log(userData.boughtItems.tentree);
        history.patagonia=[...userData.patagoniacart, ...userData.boughtItems.patagonia];
        history.tentree=[...userData.tentreecart, ...userData.boughtItems.tentree];
        await model.replaceOne(
            { email: email },
            {
              _id: userData["_id"],
              email: userData.email,
              password: userData.password,
              __v: userData["__v"],
              patagoniacart: [],
              tentreecart: [],
              boughtItems: history
            }
          );
      }

      res.sendStatus(200);
};

module.exports=handleBuy;