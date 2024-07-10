import express from "express";
import cors from "cors";
import router from "./app/routes/route";
import { globalsErrorHandler } from "./app/middleware/globalsErrorHandler";
import { notFound } from "./app/utils/notFound";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use(globalsErrorHandler);
app.use(notFound);
export default app;
