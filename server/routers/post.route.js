const express = require('express');
const route = express.Router();
const postController = require("../controllers/post.controller");

//[GET] /api/post: Lấy danh sách bài viết
route.get("/", postController.getPosts);

//[GET] /api/post/:id: Lấy chi tiết bài viết
route.get("/:id", postController.getPostById);


module.exports = route;