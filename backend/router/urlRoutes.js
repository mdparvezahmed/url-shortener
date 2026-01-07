const express = require("express");
const { shortenUrl, getUrls, deleteUrl, getUrlByShortcode } = require("../controller/urlController");
const verifyToken = require("../middlewares/authMiddleware");


const router = express.Router();

router.route("/").get(verifyToken, getUrls);
router.route("/shorten").post(verifyToken, shortenUrl);
router.route("/:id").delete(verifyToken, deleteUrl);
router.route("/redirect/:shortcode").get(getUrlByShortcode);



module.exports = router;