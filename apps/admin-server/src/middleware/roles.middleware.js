import CustomErrorHandler from "../service/CustomHandler.service";

const role = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!allowedRoles.includes(userRole)) {
        next(CustomErrorHandler.accessDenied("User cannot consume this api"));
      }
      next();
    } catch (error) {
      next(CustomErrorHandler.serverError());
    }
  };
};

export default role;
