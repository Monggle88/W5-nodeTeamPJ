// controllers/comments.js

const CommentService = require('../services/comments.services');

class CommentsController {
    commentService = new CommentService();

    getComments = async (req, res, next) => {
        // postId 확인
        const { postId } = req.params;
        console.log(postId); //ㅇㅋ
        const comments = await this.commentService.getComments(postId);

        res.status(200).json({ data: comments });
    };

    createComment = async (req, res, next) => {
        const { userId } = res.locals.user;

        const { postId } = req.params;

        const { comment } = req.body;

        const createCommentData = await this.commentService.createComment(
            postId,
            userId,
            comment,
        );

        res.status(201).json({ data: createCommentData });
    };

    updateComment = async (req, res, next) => {
      try{
        const { commentId } = req.params;
        const  {user}  = res.locals
        console.log(user)
        const userId = user.userId
        console.log(userId)
        const { comment } = req.body;

        const updateComment = await this.commentService.updateComment(
            commentId,
            userId,
            comment,
        );

        res.status(200).send(updateComment);
      } catch(error) {
        res.status(400).send({errorMessage: error.message});
      }
    };

    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;

        const deleteComment = await this.commentService.deleteComment(
            commentId,
        );

        res.status(200).json({ data: deleteComment });
    };
}

module.exports = CommentsController;
