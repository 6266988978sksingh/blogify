const express = require('express')
require('dotenv').config();
const path = require('path')
const userRouter= require('./route/userRoute')
const mongoose= require('mongoose')
const {connectdb}=require('./config')
const cookieParser = require('cookie-parser')
const { checkAuth } = require('./middlewares/authMiddleware')
const blogRouter= require('./route/blogRoute')
const blogModel= require('./models/blogModel')
 require('dotenv').config();

const app = express();
const PORT =process.env.PORT|| 8000;
connectdb(process.env.MONGO_URL)
//"mongodb://localhost:27017/blog-app"

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkAuth("token"));
app.use('/uploads', express.static(path.resolve('./public/uploads')));
app.use('/images', express.static(path.resolve('./public/images')));




app.get('/', async (req, res) => {
    // req.user ko populate karo
    // Populate req.user ke sath fullname aur profileImage
    
    const allBlogs = await blogModel.find({}) // Blog data ke sath user ka fullname aur profileImage
    console.log(req.user)
    return res.render('home', {
        user: req.user,   // Ab req.user mein fullname aur profileImage aaye ga
        blogs: allBlogs,
    });
 });
 

app.use('/user',userRouter);
app.use('/',userRouter);
app.use('/blog',blogRouter)


app.listen(PORT,console.log(`server started on port ${PORT}`))