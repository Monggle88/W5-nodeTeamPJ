// repositories/comments.js

const { Users, Posts, Comments } = require('../models');

class CommentRepository {
    // 전체 댓글 조회
    getComments = async (postId) => {
        // ORM인 Sequelize에서 Comments 모델의 findAll 메소드를 사용해 데이터를 호출합니다.
        const comments = await Comments.findAll({
            where: { postId },
        });

        if (!comments) throw new error('댓글이 없습니다.');

        return comments;
    };

    // 댓글 생성
    createComment = async (postId, userId, comment) => {
        console.log(userId); // undefined가 뜬다.
        const existPost = await Posts.findByPk(postId);

        // if (!existPost) throw new error('없는 게시글입니다.');

        const createCommentData = await Comments.create({
            postId,
            userId,
            comment,
        });

        return createCommentData;
    };

    // 댓글 수정
    // updateComment = async (commentId, userId, comments) => {

    //   // 댓글있는지?
    //   const existComment = await Comments.findAll({where: {commentId}});

    //   // if (!existComment) throw new error('없는 댓글이다.');

    //   // userId 일치?
    //   // if (existComment.userId !== userId) throw new error('사용자가 일치하지 않습니다')

    //   const updateCommentData = await Comments.update(
    //     { where: { commentId }},
    //     { comments },
    //   );

    //   return updateCommentData;
    // };

    updateComment = async (commentId, userId, comment) => {
        try {
            // ORM인 Sequelize에서 Comments 모델의 findByPk 메소드를 사용해 commentId 존재 여부 확인
            const existComment = await Comments.findByPk(commentId);
            if (!existComment) throw new Error('존재하지 않는 댓글입니다.');
            // userId 일치 여부 확인
            // if (existComment.userId !== userId) throw new Error('댓글 작성자만 댓글을 수정할 수 있습니다.');
            // ORM인 Sequelize에서 Comments 모델의 update 메소드를 사용해 데이터 수정 요청
            const updateComment = await Comments.update(
                { commentId,userId, comment },
                { where: {commentId} },
            );
            console.log(updateComment);
            return { message: '댓글이 수정되었습니다.' };
        } catch (error) {
            console.error(error);
            return { errorMessage: error.message };
        }
    };

    // 댓글 삭제
    deleteComment = async (commentId) => {
        const deleteCommentData = await Comments.destroy({
            where: { commentId },
        });

        return deleteCommentData;
    };
}

module.exports = CommentRepository;
