import { Router } from "express";
import { PassportStatic } from "passport";
import jwt from "jsonwebtoken";

function buildAuthRouter(passport: PassportStatic, jwtSecret: string) {
  const authRouter = Router();

  authRouter.get("/auth/spotify", function (req, res) {
    passport.authenticate("spotify", {
      scope: ["user-read-email", "user-read-private", "user-top-read"],
      showDialog: true,
      ...(req.query.state && { state: req.query.state }),
    } as any)(req, res);
  });

  // this route should be called by front-end
  authRouter.get(
    "/auth/spotify/callback",
    passport.authenticate(
      "spotify"
      // { failureRedirect: "/login" }
    ),
    function (req, res) {
      const token = jwt.sign({ user: req.user }, jwtSecret);
      return res.json({ token });
    }
  );

  // for testing
  authRouter.get("/auth/spotify/callback-intercept", function (req, res) {
    return res.json({
      state: req.query.state,
      code: req.query.code,
    });
  });

  return authRouter;
}

export { buildAuthRouter };
