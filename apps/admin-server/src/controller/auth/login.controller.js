import { eq } from "drizzle-orm";
import { db } from "../../../db.js";
import { user } from "../../schema.js";
import CustomErrorHandler from "../../service/CustomHandler.service.js";
import HashPassword from "../../service/HashPassword.service.js";
import JWTService from "../../service/JWT.service.js";
import { withTypedRequestResponse } from "../../utils/controller-types.js";

export const loginUser = withTypedRequestResponse(async (req, res, next) => {
  const { userName, password } = req.body;

  const userFound = await db.query.user.findFirst({
    where: eq(user.username, userName),
  });

  if (!userFound) {
    next(CustomErrorHandler.unAuthorized());
  }

  // check user password
  const ok = await HashPassword.verify(password, userFound.password);
  if (!ok) {
    next(CustomErrorHandler.unAuthorized());
  }
  const jwtPayload = {
    id: userFound.id,
  };

  const token = JWTService.sign(jwtPayload, "10m");
  const refreshToken = JWTService.sign(jwtPayload, "30d");

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.cookie("rft", refreshToken, {
    httpOnly: true,
  });

  return res.send({
    message: "OK",
  });
});

export const registerUser = withTypedRequestResponse(async (req, res, next) => {
  const { userName, password } = req.body;

  // Hash user password
  const hPass = await HashPassword.hash(password);

  const newUser = await db.insert(user).values({
    username: userName,
    password: hPass,
  });

  return res.send(newUser);
});
