
import UserPost from "../models/userpost.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) =>{
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please provide all required fields!'))
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'')
    const newPost = new UserPost({
        ...req.body, slug, userId:req.user.id
    }); 

    try{
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    }
    catch(error){
    next(error);
    }

}


export const getposts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.order === 'asc' ? 1 : -1;
      const posts = await UserPost.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: 'i' } },
            { content: { $regex: req.query.searchTerm, $options: 'i' } },
          ],
        }),
      }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);
  
      const totalPosts = await UserPost.countDocuments();

      const now = new Date();

      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await UserPost.countDocuments({
        createdOn: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      });
    } catch (error) {
      next(error);
    }
  };

  export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this post'));
    }
    try {
      await UserPost.findByIdAndDelete(req.params.postId);
      res.status(200).json('The post has been deleted');
    } catch (error) {
      next(error);
    }
  };

  export const updatepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }
    try {
      const updatedPost = await UserPost.findByIdAndUpdate(
        req.params.postId,
        {
          $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            postImage: req.body.postImage,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  };


  export const likePost = async (req, res, next) => {
  
    try {
      const post = await UserPost.findById(req.params.postId);
      if(!post){
        return next(errorHandler(404, 'Post not found'));
      }
  
      const userIndex = post.likes.indexOf(req.user.id);
      if(userIndex === -1){
        post.numberOfLikes += 1;
        post.likes.push(req.user.id);
      }
      else{
        post.numberOfLikes -= 1;
        post.likes.splice(userIndex, 1);
      }
  
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  
  };
  
  