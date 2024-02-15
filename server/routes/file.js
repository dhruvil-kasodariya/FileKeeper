
const router = require("express").Router();
const { addFile, getUserFiles, deleteUserFile, downloadFile } = require("../controllers/FileController");
const verifyToken = require("../middleware/verifyToken");
const uploadStorage = require("../middleware/uploadStorage");

router.post("/add-file", verifyToken ,uploadStorage.single("file"), addFile);
router.get("/get-user-files/:userId",verifyToken,getUserFiles);
router.delete("/delete-file/:fileId",verifyToken,deleteUserFile);
router.post('/download', downloadFile);

module.exports = router;
