const PostsService = require('../services/posts.services');
const { InvalidParamsError } = require('../exceptions/index.exception');

class PostsController {
    constructor() {
        this.postsService = new PostsService();
    }

    //전체 게시글 조회
    getAllPost = async (req, res, next) => {
        try {
            const Posts = await this.postsService.getAllPost({});

            res.json({ result: Posts });
        } catch (error) {
            next(error);
        }
    };

    //게시글 생성
    createPost = async (req, res, next) => {
        try {
            const { title, contents } = req.body;
            const { user } = res.locals;
            const nickname = user.nickname;
            const like = 0;
            // if(!nickname||!title||!contents){
            //   throw new InvalidParamsError
            // }

            const Posts = await this.postsService.createPost({
                userId: user.userId,
                nickname,
                title,
                contents,
                like,
            });

            res.json({ result: Posts });
        } catch (error) {
            next(error);
        }
    };

    //게시글 수정
    putPost = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { title, contents } = req.body;
            const { user } = res.locals;
            const nickname = user.nickname;
            if (!title || !contents || !nickname) {
                throw new InvalidParamsError();
            }
            const Posts = await this.postsService.putPost({
                title,
                contents,
                postId,
            });
            res.send('수정이 완료되었습니다.');
        } catch (error) {
            next(error);
        }
    };

    //게시글 삭제
    deletePost = async (req, res, next) => {
        const { postId } = req.params;
        try {
            const Posts = await this.postsService.deletePost({ postId });
            res.send('삭제가 완료되었습니다.');
        } catch (error) {
            next(error);
        }
    };

    //게시글 상세조회
    getPost = async (req, res, next) => {
        const { postId } = req.params;
        try {
            const detailPost = await this.postsService.getPost({ postId });
            res.json({ result: detailPost });
        } catch (error) {
            next(error);
        }
    };

    //좋아요 목록 확인
    getLikePost = async (req, res, next) => {
        try {
            const { user } = res.locals;
            const userId = user.userId;
            const likePost = await this.postsService.getLikePost({ userId });
            res.json({ result: likePost });
        } catch (error) {
            next(error);
        }
    };

    //좋아요
    putLike = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { user } = res.locals;
            const userId = user.userId;
            const likeDetail = await this.postsService.getUserId({ userId });
            if (likeDetail) {
                const likeUserId = likeDetail.userId;
                const likepost = likeDetail.postId;
                console.log('if 1');
                if (likeUserId === String(userId) && likepost === postId) {
                    console.log('이프');
                    const unLikePost = await this.postsService.deleteLike(
                        postId,
                    );
                    res.send('좋아요가 취소되었습니다.');
                } else {
                    console.log('엘스');
                    const putLike = await this.postsService.putLike({
                        postId,
                        userId,
                    });
                    res.send('좋아요를 등록했습니다.');
                }
            } else {
                console.log('else2');
                const putLike = await this.postsService.putLike(postId, userId);
                res.send('좋아요를 등록했습니다.');
            }
        } catch (error) {
            next(error);
        }
    };
}

module.exports = PostsController;
