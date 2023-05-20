/*
TODO: Real database
TODO: Unit-Integration test
TODO: eslint, prettier
*/

import sequelize from "./db";
import createRestApplication from "./app";

const startServer = async () => {
  const port = 9092;
  await sequelize.sync();
  const app = createRestApplication();
  app.listen(port);
};

startServer();
