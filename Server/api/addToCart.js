const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const addToCart = async (req, res) => {
  console.log(req.body);
  const schema = new mongoose.Schema({
    email: String,
    password: String,
    patagoniacart: Array,
    tentreecart: Array,
    boughtItems: Object,
  });

  const model = mongoose.models["users"] || mongoose.model("users", schema);

  const email = req.body.email,
    id = req.body.key;

  let userData = await model.findOne({ email: { $eq: `${email}` } });

  if (req.body.brand === "patagonia") {
    if (userData?.patagoniacart) {
      console.log("exists")
      try {
        await model.replaceOne(
          { email: email },
          {
            _id: userData["_id"],
            email: userData.email,
            password: userData.password,
            __v: userData["__v"],
            patagoniacart: [...new Set([...userData.patagoniacart, id])],
            tentreecart: userData.tentreecart,
            boughtItems: userData.boughtItems,
          }
        );

        res.sendStatus(200);
      } catch (err) {
        console.log("err", err);
        res.sendStatus(409);
      }
    } else {
      try {
        console.log("Doesn't exists")
        await model.replaceOne(
          { email: email },
          {
            _id: userData["_id"],
            email: userData.email,
            password: userData.password,
            __v: userData["__v"],
            patagoniacart: [id],
            tentreecart: userData.tentreecart,
            // boughtItems: userData.boughtItems,
          }
        );

        res.sendStatus(200);
      } catch (err) {
        console.log("err", err);
        res.sendStatus(409);
      }
    }
  } else if (req.body.brand === "tentree") {
    if (userData?.tentreecart) {
      try {
        await model.replaceOne(
          { email: email },
          {
            _id: userData["_id"],
            email: userData.email,
            password: userData.password,
            __v: userData["__v"],
            patagoniacart: userData.patagoniacart,
            tentreecart: [...new Set([...userData.tentreecart, id])],
            boughtItems: userData.boughtItems,
          }
        );

        res.sendStatus(200);
      } catch (err) {
        console.log("err", err);
        res.sendStatus(409);
      }
    } else {
      try {
        await model.replaceOne(
          { email: email },
          {
            _id: userData["_id"],
            email: userData.email,
            password: userData.password,
            __v: userData["__v"],
            patagoniacart: userData.patagoniacart,
            tentreecart: [id],
            // boughtItems: userData.boughtItems,
          }
        );

        res.sendStatus(200);
      } catch (err) {
        console.log("err", err);
        res.sendStatus(409);
      }
    }
  }
};

module.exports = addToCart;
