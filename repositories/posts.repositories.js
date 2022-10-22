const { Posts } = require('../models');
const { Op } = require('sequelize');

class PostsRepository extends Posts {
    constructor() {
        super();
    }

    //전체 게시글 조회
    getAllPost = async () => {
        const Post = await Posts.findAll();
        return Post;
    };

    //게시글 생성
    createPost = async ({ userId, title, contents, like }) => {
        const newPost = await Posts.create({
            userId,
            title,
            contents,
            like,
        });
        return newPost;
    };

    //게시글 수정
    putPost = async ({ postId, title, contents }) => {
        const Post = await Posts.update(
            { title, contents },
            { where: { postId } },
        );

        return Post;
    };

    //게시글 삭제
    deletePost = async ({ postId }) => {
        const Post = await Posts.destroy({ where: { postId } });
        return Post;
    };

    //게시글 상세조회
    getPost = async ({ postId }) => {
        const detailPost = await Posts.findOne({
            where: { postId },
        });
        return detailPost;
    };

    //좋아요 증가
    increseLike = async (postId) => {
        const increseLike = await Posts.increment(
            {
                like: 1,
            },
            {
                where: postId,
            },
        );
        return increseLike;
    };

    //좋아요 감소
    decreseLike = async (postId) => {
        const decreseLike = await Posts.increment(
            {
                like: -1,
            },
            {
                where: { postId },
            },
        );
        return decreseLike;
    };
}

module.exports = PostsRepository;
