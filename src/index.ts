import * as dotenv from "dotenv";
import { buildApp } from "./app";

// LOAD ENV VAR
dotenv.config();

const app = buildApp({
  jwtSecret: process.env.JWT_SECRET || "SECRET",
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID || "",
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  clientCallbackUrl:
    process.env.CLIENT_AUTH_CALLBACK || "http://path-front-end/auth-callback",
});

const port = 3000;
app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
