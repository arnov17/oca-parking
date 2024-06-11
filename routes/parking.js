const express = require("express");

const router = express.Router();

const CalculatorController = require("../controllers/parking");

router.post("/enter", CalculatorController.enterParking);
router.put("/exit/:id", CalculatorController.exitParking);
router.get("/report/type", CalculatorController.reportType);
router.get("/report/color", CalculatorController.reportColor);

module.exports = router;