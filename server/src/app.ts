import express, { type Application } from "express";
import cors from "cors";
import { routes } from "./infra/routes";
import { errorHandler } from "./infra/middlewares/error-handler";
import { env } from "./utils/env";

const app: Application = express();
app.use(
  cors({
    origin: env.WEB_ORIGIN,
    methods: "*",
  })
);
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
