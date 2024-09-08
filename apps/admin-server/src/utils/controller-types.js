import CustomErrorHandler from "../service/CustomHandler.service.js";
``;
/**
 * Higher-order function that takes a controller function and ensures it gets the correct types
 * @param {(req: import("express").Request, res: import("express").Response, next: Function) => Promise<void>} controller
 * @returns {(req: import("express").Request, res: import("express").Response, next: Function) => Promise<void>}
 */
export const withTypedRequestResponse = (controller) => {
  return async (
    /** @type {import("express").Request} */ req,
    /** @type {import("express").Response} */ res,
    /** @type {Function} */ next
  ) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      console.log(err);
      next(CustomErrorHandler.serverError());
    }
  };
};
