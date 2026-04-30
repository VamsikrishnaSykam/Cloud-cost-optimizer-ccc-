const express = require("express");
const { optimizeCosts } = require("../controllers/optimizeController");

const router = express.Router();

router.post("/optimize", optimizeCosts);

module.exports = router;
