const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const removeItem = async (req, res) => {
  console.log("At remove item Route");
  console.log(req.body);

  const email = req.body.email,
    brand = req.body.brand,
    id = req.body.id;

  const usersSchema = new mongoose.Schema({
    email: String,
    password: String,
    patagoniacart: Array,
    tentreecart: Array,
    boughtItems: Object
  });
  const productsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    price: Number,
  });

  const userModel =
    mongoose.models["users"] || mongoose.model("users", usersSchema);
  const patagoniaModel =
    mongoose.models["patagonias"] ||
    mongoose.model("patagonias", productsSchema);
  const tentreeModel =
    mongoose.models["tentrees"] || mongoose.model("tentrees", productsSchema);

  const userData = await userModel.findOne({ email: { $eq: email } });

  if (brand === "patagonia") {
    let updatedPatagonia = userData.patagoniacart.filter((element) => {
      return element !== id;
    });

    try {
      await userModel.replaceOne(
        { email: email },
        {
          _id: userData["_id"],
          email: userData.email,
          password: userData.password,
          __v: userData["__v"],
          patagoniacart: updatedPatagonia,
          tentreecart: userData.tentreecart,
        }
      );

      res.sendStatus(200);
    } catch (err) {
      console.log("err", err);
      res.sendStatus(409);
    }
  } else if (brand === "tentree") {
    let updatedTentree = userData.tentreecart.filter((element) => {
      return element !== id;
    });

    try {
      await userModel.replaceOne(
        { email: email },
        {
          _id: userData["_id"],
          email: userData.email,
          password: userData.password,
          __v: userData["__v"],
          patagoniacart: userData.patagoniacart,
          tentreecart: updatedTentree,
        }
      );

      res.sendStatus(200);
    } catch (err) {
      console.log("err", err);
      res.sendStatus(409);
    }
  }
};

module.exports = removeItem;
