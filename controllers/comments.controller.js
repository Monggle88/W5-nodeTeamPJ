// controllers/comments.js

const CommentService = require('../services/comments.services');

class CommentsController {
    commentService = new CommentService();

    getComments = async (req, res, next) => {
        try {
            // postId 확인
            const { postId } = req.params;

            const comments = await this.commentService.getComments(postId);

            res.status(200).json({ data: comments });
        } catch (error) {
            next(error);
        }
    };

    createComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;

            const { postId } = req.params;

            const { comment } = req.body;

            const createCommentData = await this.commentService.createComment(
                postId,
                userId,
                comment,
            );

            res.status(201).json({ data: createCommentData });
        } catch (error) {
            next(error);
        }
    };

    updateComment = async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const { user } = res.locals;

            const userId = user.userId;

            const { comment } = req.body;

            const updateComment = await this.commentService.updateComment(
                commentId,
                userId,
                comment,
            );

            res.status(200).send(updateComment);
        } catch (error) {
            res.status(400).send({ errorMessage: error.message });
        }
    };

    deleteComment = async (req, res, next) => {
        try {
            const { commentId } = req.params;

            await this.commentService.deleteComment(commentId);

            res.status(200).json({ msg: '댓글 삭제 성공!' });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = CommentsController;
