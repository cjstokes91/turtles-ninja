const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
};

async function signup(req, res) {
  const user = new User(req.body);

  try {
    await user.save();
    console.log('hello')
    // Be sure to first delete data that should not be in the token
    const token = createJWT(user);
    console.log(token);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
