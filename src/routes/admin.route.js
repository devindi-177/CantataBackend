const express = require("express");
const router = express.Router();

const adminController = require("../controller/admin.controller");
const notificationController = require("../controller/notification.controller");

router.post("/addnotification", notificationController.createNotification);


router.post("/checkadmin", adminController.checkAdmin);
router.get('/getadmin',adminController.getAdmin);

module.exports = router;
