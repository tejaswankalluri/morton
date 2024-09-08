import jwt from "jsonwebtoken";
import config from "../config/config.js";

class JWTService {
  static sign(payload, expiry = "14d", secret = config.SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = config.SECRET) {
    return jwt.verify(token, secret);
  }
}

export default JWTService;
