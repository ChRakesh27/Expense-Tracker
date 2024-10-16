const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const authToken = req.headers.authorization;
    console.log(authToken);
    if (authToken) {
      const token = authToken.split(" ")[1];
      const decodedToken = await jwt.verify(token, process.env.SECRET_STR);
      if (decodedToken.userId) req.userId = decodedToken.userId;
      else throw new Error("UserId Not Found");

      next();
    } else {
      throw new Error("Missing authorization token in Headers");
    }
  } catch (error) {
    res.status(401).send({ message: error.message, error });
  }
}

module.exports = authMiddleware;
