"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var tweets_controller_1 = __importDefault(require("../controllers/tweets.controller"));
var router = express_1.Router();
router.get("/", tweets_controller_1["default"].tweetList);
router.get("/new", tweets_controller_1["default"].tweetNew);
router.get("/edit/:tweetId", tweets_controller_1["default"].tweetEdit);
router.post("/", tweets_controller_1["default"].tweetCreate);
router.post("/update/:tweetId", tweets_controller_1["default"].tweetUpdate);
router["delete"]("/:tweetId", tweets_controller_1["default"].tweetDelete);
exports["default"] = router;
//# sourceMappingURL=tweets.route.js.map