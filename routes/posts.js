const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

//전체 게시글 조회
router.get('/', postsController.getAllPost);
//게시글 생성
router.post('/', authMiddleware, postsController.createPost);
//좋아요 목록 확인
router.get('/like', authMiddleware, postsController.getLikePost);
//좋아요
router.put('/:postId/like', authMiddleware, postsController.putLike);
//게시글 수정
router.put('/:postId', authMiddleware, postsController.putPost);
//게시글 삭제
router.delete('/:postId', authMiddleware, postsController.deletePost);
//상세 게시글 조회
router.get('/:postId', postsController.getPost);

module.exports = router;
