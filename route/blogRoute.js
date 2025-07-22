const { Router } = require('express');
const blogModel= require('../models/blogModel');
const Comment= require('../models/commentModel')
const multer = require('multer');
const path= require('path')



const router= Router();

router.get('/addnew',(req,res)=>{
    return res.render("addBlog",{
        user:req.user,
    });
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName= `${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })


  
  const upload = multer({ storage: storage })

router.post('/',upload.single('coverImage'),async(req,res)=>{
  
        const {title,body}= req.body;

    const blog= await    blogModel.create({
            body,
            title,
            createdBy:req.user._id,
            coverImageURL:`${req.file.filename}`,
        })

       return  res.redirect(`/blog/${blog._id}`)


})

router.get('/:id', async (req,res)=>{
  const blog = await blogModel.findById(req.params.id).populate('createdBy');
  const comments= await Comment.find({blogId:req.params.id}).populate('createdBy');
  console.log(comments)
  
   
 
  return res.render('blog',{
    user:req.user,
    blog,
    comments,
  })
})

router.post('/comment/:blogId',async (req,res)=>{
  const comment = await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdBy:req.user._id,
  })

  return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports=router;