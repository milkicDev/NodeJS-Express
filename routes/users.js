const express = require("express");
const router = express.Router();
const UserController = require("../app/Controllers/UserController");

router.get("/", (req, res, next) => {
  UserController.index(req, res);
});

router.get("/create", (req, res, next) => {
  UserController.create(req, res);
});

router.post("/store", (req, res, next) => {
  UserController.store(req, res);
});

router.get("/:id", (req, res, next) => {
  UserController.show(req, res);
});

router.get("/edit/:id", (req, res, next) => {
  UserController.edit(req, res);
});

router.post("/update/:id", (req, res, next) => {
  UserController.update(req, res);
});

router.post("/destroy/:id", (req, res, next) => {
  UserController.destroy(req, res);
});

module.exports = router;
