const express = require("express");
const router = express.Router();
const requests_controller = require("../controllers/requestsController");

router.get("/", requests_controller.get_all_requests);
router.get("/:id", requests_controller.get_request_by_id);
router.post("/", requests_controller.create_request);
router.patch("/:id", requests_controller.update_request);
router.delete("/:id", requests_controller.delete_request);

module.exports = router;