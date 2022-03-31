import * as dotenv from "dotenv";
import { buildApp } from "./app";

// LOAD ENV VAR
dotenv.config();

const app = buildApp({
  jwtSecret: process.env.JWT_SECRET || "SECRET",
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID || "",
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
  authPath: "/auth/spotify",
});

const port = 3000;
app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
