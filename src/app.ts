import express from "express";
import { buildTransactionService } from "./transactions";

const app = express();

const transactionService = buildTransactionService();

app.get("/ready", (req, res) => {
  res.json({ status: "ready" });
});

app.get("/transactions", async (req, res) => {
  // TODO: add query params validation / typeguard

  const data = await transactionService.read({
    iban: req.query.iban as string | undefined,
  });

  res.json(data);
});

app.get("/transactions/largest-amount", async (req, res) => {
  // TODO: add query params validation / typeguard

  const largest = await transactionService.readLargest({
    iban: req.query.iban as string | undefined,
  });

  if (largest === undefined) {
    return res.status(404).send();
  }

  return res.json(largest);
});

export { app };
