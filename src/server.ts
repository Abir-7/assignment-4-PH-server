import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";

async function main() {
  await mongoose.connect(config.mogodbUri as string);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port  ${config.port}`);
  });
}

// eslint-disable-next-line no-console
main().catch((err) => console.log(err));
