import conf from "../.env";
const env = conf[process.env.NODE_ENV as "developpement" | "production"];
import { Request, Response, NextFunction } from "express";
const jwtSecret = env.jwtSecret;
import jwt from "jsonwebtoken";
import serviceUser from "../services/user.service";
import { IUser } from "../interfaces/user.interface";

const createToken = (userId: string) => {
  const jwtToken = jwt.sign(
    {
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + 10, // 20min idéal
    },
    jwtSecret
  );
  return jwtToken;
};

const checkExpirationToken = (token: any, res: Response) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token;
  } else if (nowInSec > tokenExp && nowInSec - tokenExp < 5) {
    const refreshToken = createToken(token.sub);
    res.cookie("jwt", refreshToken, {
      secure: true,
      httpOnly: true,
      domain: env.domain,
    });
    return jwt.verify(refreshToken, jwtSecret);
  } else {
    throw new Error("token expired");
  }
};

const jwtAuth = {
  extractUserFromToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token: string = req.cookies.jwt;
    if (token) {
      try {
        let decodedToken: any = jwt.verify(token, jwtSecret, {
          ignoreExpiration: true,
        });
        decodedToken = checkExpirationToken(decodedToken, res);
        const user = await serviceUser.findUserPerId(decodedToken.sub);
        if (user) {
          req.user = user;
          next();
        } else {
          res.clearCookie("jwt");
          res.redirect("/");
        }
      } catch (err) {
        res.clearCookie("jwt");
        res.redirect("/");
      }
    } else {
      next();
    }
  },

  addJwtFeatures: (req: Request, res: Response, next: NextFunction) => {
    req.isAuthenticated = () => !!req.user;
    req.login = (user: IUser) => {
      const token = createToken(user.id);
      res.cookie("jwt", token, {
        secure: true,
        httpOnly: true,
        domain: env.domain,
      });
      console.log(`${user}, vient de se connecter`);
    };
    req.logout = () => res.clearCookie("jwt");
    next();
  },
};

export default jwtAuth;
