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
    mongoose.models["patagonias"] || mongoose.model("patagonias", schema);
  const tentree =
    mongoose.models["tentree"] || mongoose.model("tentree", schema);

  let patagoniaProducts = await patagonia.find({});
  let tentreeProducts = await tentree.find({});

  console.log(patagoniaProducts);
  console.log(tentreeProducts);

  const result=
  {
    patagonia: patagoniaProducts,
    tentree: tentreeProducts
  };

  res.status(200);
  res.json(result);
};

module.exports = getProducts;
