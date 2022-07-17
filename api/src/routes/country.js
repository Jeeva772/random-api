const express = require("express");
const countryController = require('../controller/country-controller');

const router = express.Router();

router.get("/batchUpdate", countryController.updateBatchData);

router.get("/users", countryController.getCountry);

module.exports = router;
