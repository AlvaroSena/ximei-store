import express from "express";
import { routes } from "./infra/routes";

const app = express();
app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.json({ message: "hello, world" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
