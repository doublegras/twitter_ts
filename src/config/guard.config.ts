import { Response, Request, NextFunction } from "express";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    //console.log(req.user.local.email);
    next();
  } else {
    res.redirect("/auth/signin/form");
  }
};
