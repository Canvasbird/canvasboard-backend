const express = require("express");
const { allPlugin } = require("../controllers/pluginsController/allPlugins");
const { createPlugin } = require("../controllers/pluginsController/createPlugin");
const { onePlugin } = require("../controllers/pluginsController/onePlugin");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");


router.get("/get-all", isAuthenticated, allPlugin);
router.post("/create-plugin", isAuthenticated, createPlugin);
router.get("/get-one/:plugin", isAuthenticated, onePlugin);

module.exports = router;