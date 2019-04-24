// Config no Express
const express = require("express");
const routes = express.Router();

// Config no multer
const multer = require("multer");
const multerConfig = require("./config/multer");

// Chamada dos controllers
const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

routes.post("/boxes/store", BoxController.store);
routes.get("/boxes/:id/show", BoxController.show);

routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"),
  FileController.store
);

routes.get("/teste", (req, res) => {
  return res.send("Hello World!");
});

module.exports = routes;
