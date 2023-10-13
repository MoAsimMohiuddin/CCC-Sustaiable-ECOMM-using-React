const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const url = "mongodb://127.0.0.1:27017/cognidaEcommDB";
mongoose.connect(url);

const handleRegister = async (req, res) => {
  console.log(req.body);

  const schema = new mongoose.Schema({
    email: String,
    password: String,
  });

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const model = mongoose.models["users"] || mongoose.model("users", schema);

  const match = await model.find({ email: { $eq: `${req.body.email}` } });
  console.log(match);

  if (match[0]) {
    console.log('User Already Exists');
    res.sendStatus(409);
    return;
  } else {
    console.log("New user");
    const newUser = new model({
      email: req.body.email,
      password: hashedPassword,
    });

    newUser.save();

    res.sendStatus(200);
  }
};

module.exports = handleRegister;
