import { Router, Request, Response, NextFunction } from "express";
import fetch from "node-fetch";
import { get, set } from "../../cache/redis";
const router = Router();

router.get(
  "/",
  get,
  async (req: Request, res: Response, _next: NextFunction) => {
    fetch("https://api.spacexdata.com/v3/launches/latest")
      .then((res) => res.json())
      .then((json) => {
        set(req.route.path, json);
        res.status(200).send(json);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send(error);
      });
  }
);
export default router;
