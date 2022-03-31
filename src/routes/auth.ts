import { Router } from "express";
import { PassportStatic } from "passport";
import jwt from "jsonwebtoken";

function buildAuthRouter(
  passport: PassportStatic,
  authPath: string,
  jwtSecret: string
) {
  const authRouter = Router();

  authRouter.get(
    authPath,
    passport.authenticate("spotify", {
      scope: ["user-read-email", "user-read-private", "user-top-read"],
      showDialog: true,
    } as any)
  );

  authRouter.get(
    authPath + "/callback",
    passport.authenticate(
      "spotify"
      // { failureRedirect: "/login" }
    ),
    function (req, res) {
      const token = jwt.sign({ user: req.user }, jwtSecret);
      return res.json({ token });
    }
  );

  return authRouter;
}

export { buildAuthRouter };
