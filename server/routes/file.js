
const router = require("express").Router();
const { addFile } = require("../controllers/FileController");
const verifyToken = require("../middleware/verifyToken");
const uploadStorage = require("../middleware/uploadStorage");

router.post("/add-file", verifyToken ,uploadStorage.single("file"), addFile);

module.exports = router;
