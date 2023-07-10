const router =require('express').Router()
const postAPIs=require('../APIs/PostAPI')


// create post
router.route('/create').post((req,res)=>{
    postAPIs.createPost(req,res)
})
// update post
router.route('/update').post((req,res)=>{
    postAPIs.updatePost(req,res)
})
// like post
router.route('/like/:id').get((req,res)=>{
    postAPIs.likePost(req,res)
})
// comment post
router.route('/comment').post((req,res)=>{
    postAPIs.commentPost(req,res)
})