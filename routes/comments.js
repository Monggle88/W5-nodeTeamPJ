const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js');
const CommentsController = require('../controllers/comments.controller.js');
const commentsController = new CommentsController();

//전체 댓글 조회
router.get('/:postId', authMiddleware, commentsController.getComments);

//댓글 추가
router.post('/:postId', authMiddleware, commentsController.createComment);

//댓글 수정
router.put('/:commentId', authMiddleware, commentsController.updateComment);

//댓글 삭제
router.delete('/:commentId', authMiddleware, commentsController.deleteComment);

module.exports = router;
