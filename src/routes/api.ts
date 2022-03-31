import { Router } from "express";

function buildApiRouter() {
  const apiRouter = Router();

  apiRouter.get("/test-resource", async function (req, res) {
    return res.json({ data: "test-data" });
  });

  return apiRouter;
}

export { buildApiRouter };
