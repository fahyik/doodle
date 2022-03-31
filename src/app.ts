import express from "express";

import { buildAppPassport } from "./passport";
import { buildApiRouter } from "./routes/api";
import { buildAuthRouter } from "./routes/auth";

type AppConfig = {
  spotifyClientId: string;
  spotifyClientSecret: string;
  jwtSecret: string;
  clientCallbackUrl: string;
};

function buildApp(config: AppConfig) {
  const app = express();

  const userStore = new Map<string, object>();

  const passport = buildAppPassport({
    spotifyClientId: config.spotifyClientId,
    spotifyClientSecret: config.spotifyClientSecret,
    jwtSecret: config.jwtSecret,
    callbackUrl: config.clientCallbackUrl,
    userStore,
  });

  app.use(passport.initialize());

  app.use(buildAuthRouter(passport, config.jwtSecret));

  app.use(
    "/api",
    passport.authenticate("jwt", { session: false }),
    buildApiRouter()
  );

  app.get("/ready", (req, res) => {
    res.json({ status: "ready" });
  });

  return app;
}

export { buildApp };
