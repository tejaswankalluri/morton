import { eq } from "drizzle-orm";
import { db } from "../../../db.js";
import { ROLES, user } from "../../schema.js";
import CustomErrorHandler from "../../service/CustomHandler.service.js";
import HashPassword from "../../service/HashPassword.service.js";
import JWTService from "../../service/JWT.service.js";
import { withTypedRequestResponse } from "../../utils/controller-types.js";
import expressAsyncHandler from "express-async-handler";

export const loginUser = withTypedRequestResponse(async (req, res, next) => {
  const { userName, password } = req.body;

  const userFound = await db.query.user.findFirst({
    where: eq(user.username, userName),
  });

  if (!userFound) {
    return next(CustomErrorHandler.unAuthorized());
  }

  // check user password
  const ok = await HashPassword.verify(password, userFound.password);
  if (!ok) {
    return next(CustomErrorHandler.unAuthorized());
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

export const me = withTypedRequestResponse(async (req, res, next) => {
  const cookies = req.cookies;
  const token = cookies?.token;

  if (!token) {
    // check if SuperAdmin exist
    const isSuperAdminUser = await db.query.user.findFirst({
      where: eq(user.role, ROLES.superAdmin),
    });

    if (!isSuperAdminUser) {
      return res.status(403).send({
        error: "SUPER_ADMIN_NOT_CREATED",
        message: "Super Admin Not created yet",
      });
    } else {
      next(CustomErrorHandler.unAuthorized());
    }
    return next(CustomErrorHandler.unAuthorized());
  }

  // verify token
  const isValid = JWTService.verify(token);
  if (!isValid) {
    return next(CustomErrorHandler.unAuthorized());
  }
  const loggedInUser = await db.query.user.findFirst({
    columns: {
      id: true,
      username: true,
    },
    where: eq(user.id, isValid.id),
  });
  return res.send({ data: loggedInUser });
});

const registerSuperAdmin = withTypedRequestResponse(async (req, res, next) => {
  const isSuperAdminUser = await db.query.user.findFirst({
    where: eq(user.role, ROLES.superAdmin),
  });
  if (isSuperAdminUser) {
    return res.status(403).send({
      error: "SUPER_ADMIN_ALREADY_CREATED",
      message: "Super Admin already created",
    });
  }
});
