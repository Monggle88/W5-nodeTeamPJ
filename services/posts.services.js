const PostsRepository = require('../repositories/posts.repositories');
const LikeRepository = require('../repositories/like.repositories');

class PostsService {
    constructor() {
        this.LikeRepository = new LikeRepository();
        this.PostsRepository = new PostsRepository();
    }

    //전체 게시글 조회
    getAllPost = async ({}) => {
        const Posts = await this.PostsRepository.getAllPost({});

        return Posts;
    };

    //게시글 생성
    createPost = async ({ userId, title, content, like }) => {
        const newPost = await this.PostsRepository.createPost({
            userId,
            title,
            content,
            like,
        });
        return newPost;
    };

    //게시글 수정
    putPost = async ({ postId, title, content }) => {
        const Posts = await this.PostsRepository.putPost({
            title,
            content,
            postId,
        });
        return Posts;
    };

    //게시글 삭제
    deletePost = async ({ postId }) => {
        const Posts = await this.PostsRepository.deletePost({ postId });
        return Posts;
    };

    //게시글 상세조회
    getPost = async ({ postId }) => {
        const detailPost = await this.PostsRepository.getPost({ postId });
        return detailPost;
    };

    //좋아요 목록 확인
    getLikePost = async ({ userId }) => {
        const likePost = await this.LikeRepository.getLikePost({ userId });
        return likePost;
    };

    //좋아요
    putLike = async (postId, userId) => {
        console.log(postId, userId);
        const likePost = await this.LikeRepository.putLike(postId, userId);
        const increseLike = await this.PostsRepository.increseLike({ postId });
        return likePost, increseLike;
    };

    //좋아요 취소
    deleteLike = async (postId, uesrId) => {
        console.log(postId);
        const unLikePost = await this.LikeRepository.deleteLike(postId);

        const decreseLike = await this.PostsRepository.decreseLike(postId);
        return unLikePost, decreseLike;
    };

    //유저 확인
    getUserId = async (userId) => {
        const getUserId = await this.LikeRepository.getUserId(userId);
        return getUserId;
    };
}

module.exports = PostsService;
