const User = require("../models/User"); //User Module import to interact with users collection with this u can save users and read users from users collection in mongodb
const bcrypt = require("bcryptjs"); //used to hashed password before saving them
const jwt = require("jsonwebtoken"); //it will require for login api
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
//creating register function
exports.register = async (req, res) => {
  const { name, email, password,role} = req.body; //here json format data which is taken from frontend conver it into js object
  const hashedPassword = await bcrypt.hash(password, 10);

  //creating user in mongodb
  const user = await User.create({
    //it create new document in Users collection, in this documment name ,email, necrypted password will store
    name,
    email,
    password: hashedPassword,
    role: role || "employee",
  });
  res.json(user); //send response to client,sends createrd user back as json
};

//login function created
exports.login = async (req, res) => {
  const { email, password } = req.body; //email and password will be taken from frontend during login

  const user = await User.findOne({ email }); //if email exist in User collection

  if (!user) return res.status(400).json("User Not found"); //if not exist return not found

  const isMatch = await bcrypt.compare(password, user.password); //entered password vs hased password comparison is doing -middlware
  if (!isMatch) return res.status(400).json("Wrong Password");

  //JWT genearte
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1D" },
  );

  res.json({ token }); //token will be send if it correct access will be given
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User not found"); //if email of this user not found

  //if email got in db then genearte random token
  const resetToken = crypto.randomBytes(32).toString("hex"); //random secure token createf by crypto.randomBytes

  user.resetToken = resetToken;
  user.resetExpire = Date.now() + 10 * 60 * 1000; //token will be valid for 1o min

  await user.save(); //user cha record mdhe savehoto resettoken,resetexpire

  await sendEmail(user.email, resetToken);
  res.json({ message: "Reset token genearted,resetToken" });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params; //req.params mhnje linkmdhe alela token
  const { password } = req.body; //navin password store hoto req.body mdhe
  //mhnje user frontend vrun nvin pass and token pathvto

  const user = await User.findOne({
    resetToken: token, //asa user db mdhe shodto jycha reset token url token sarkha ahe
    resetExpire: { $gt: Date.now() }, //token valid ahe ka check krto mhnje expire zl nahiy ka te bgghto
  });

  if (!user) return res.status(400).json("User not found"); //asa user nsel ch db mdhe tr user not found
  const hashedPassword = await bcrypt.hash(password, 10); //nvin pass hash kela

  user.password = hashedPassword; //user chya pass chya tith nvin hash pass takla
  user.resetToken = undefined; //reset token and reset expire delete kel mhnje punha vaprta yet nahi
  user.resetExpire = undefined;
  await user.save(); //user cha record mdhe savehoto resettoken,resetexpire

  res.json("password reset suceesfully");
};
