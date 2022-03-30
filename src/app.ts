import express from "express";

const app = express();

app.get("/ready", (req, res) => {
  res.json({ status: "ready" });
});

export { app };
