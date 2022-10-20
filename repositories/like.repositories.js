const {Likes}= require('../models');

class LikeRepository extends Likes{
    constructor(){
      super();
    }
  
    //좋아요 목록 확인
    getLikePost = async(userId)=>{
      const likePost = await Likes.findAll({where:userId})
      return likePost
    }
  
    //좋아요
    putLike = async(postId,userId)=>{
      const likePost = await Likes.create({
        like:1,
        postId,
        userId,
      })
      return likePost
    }
  
    //좋아요 취소
    deleteLike = async(postId)=>{
      const unLikePost = await Likes.destroy({where:{postId}})
      
      return unLikePost
    }
  

  //유저 확인
  getUserId = async(userId)=>{
    const getUserId = await Likes.findOne({where:userId})
    return getUserId
  }
  }

  module.exports = LikeRepository