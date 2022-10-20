// services/comments.js

const CommentRepository = require('../repositories/comments.repositories');

class CommentService {
    commentRepository = new CommentRepository();

    getComments = async (postId) => {
        console.log(postId);
        const allComment = await this.commentRepository.getComments(postId);

        allComment.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return allComment.map((comment) => {
            return {
                postId: comment.postId,
                userId: comment.userId,
                comment: comment.comment,
            };
        });
    };

    createComment = async (postId, userId, comment) => {
        const createCommentData = await this.commentRepository.createComment(
            postId,
            userId,
            comment,
        );

        return {
            postId: createCommentData.postId,
            userId: createCommentData.userId,
            comment: createCommentData.comment,
        };
    };

    updateComment = async (commentId, userId, comment) => {
        // const commentId = req.params.commentId;
        const updateComment = await this.commentRepository.updateComment(
            // { where: commentId },
            commentId,
            userId,
            comment,
        );

        return updateComment;
    };

    deleteComment = async (commentId) => {
        const findComment = await this.commentRepository.deleteComment(commentId);
        if (!findComment) throw new Error('댓글 없음');

        const deleteResult = await this.commentRepository.deleteComment();

        return deleteResult;
    };
}

module.exports = CommentService;
