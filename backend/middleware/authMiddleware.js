const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; //frontend send token to http header
  console.log("HEADER:", req.headers.authorization);

  if (!authHeader) return res.status(401).json("access denied"); //no token -user is not login(bearer token)

  
  const token = authHeader.split(" ")[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //jwt checkes token validity :modified,expiredd,fake
    if (err) return res.status(403).json("Invalid token"); //if token exists but if wrong or expired

    req.user = decoded; //it contain userid
    next(); //if token correct,user authincated,now next step route
  });
};
