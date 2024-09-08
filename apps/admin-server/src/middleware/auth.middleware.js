import { db } from "../../db";
import CustomErrorHandler from "../service/CustomHandler.service";
import JWTService from "../service/JWT.service";

const Auth = async (req, res) => {
  try {
    const cookies = req.cookies();
    if (!cookies?.token) {
      next(CustomErrorHandler.unAuthorized());
    }
    const token = cookies.token;

    // verify token
    const isValid = JWTService.verify(token);
    if (!isValid) {
      next(CustomErrorHandler.unAuthorized());
    }
    const user = await db.query.user.findFirst({
      where: {
        id: isValid.id,
      },
    });
    req.userId = isValid.id;
    req.user = user;
    next();
  } catch (error) {
    next(CustomErrorHandler.serverError());
  }
};

export default Auth;
