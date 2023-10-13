const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const getProducts = async (req, res) => {
    console.log("Getting Products");
  const schema = new mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    price: Number,
  });

  const patagonia =
    mongoose.models["patagonia"] || mongoose.model("patagonia", schema);
  const tentree =
    mongoose.models["tentree"] || mongoose.model("tentree", schema);

  let patagoniaProducts = await patagonia.find({});
  let tentreeProducts = await tentree.find({});

  console.log(patagoniaProducts);
  console.log(tentreeProducts);

  res.sendStatus(200);
};

module.exports = getProducts;
