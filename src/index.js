const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");

const prepareAndStartService = () => {
  app.listen(PORT, () => {
    console.log(`server started on PORT : ${PORT}`);
  });
};

prepareAndStartService();
