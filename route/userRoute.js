const { Router } = require('express');
const userModel = require('../models/userModel');

const router = Router();
const {createTokenForUser} = require('../services/auth');
const e = require('express');
const multer= require('multer')
const path= require('path')

// GET Home Page
router.get('/', async(req, res) => {
  
  
  
  return res.render("home", { activePage: 'home',
    

   });
});

// GET Login Page
router.get('/login', (req, res) => {
  return res.render("login", { activePage: '' });
});

// GET Signup Page
router.get('/signup', (req, res) => {
  return res.render("signup", { activePage: '' });
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/images`))
    },
    filename: function (req, file, cb) {
      const fileName= `${Date.now()}-${file.originalname}`
      cb(null,fileName)
    }
  })
  const upload = multer({ storage: storage })

// POST Signup Form
router.post('/signup',upload.single('profileImageURL'), async (req, res) => {
    
    const { fulName, email, password } = req.body;
    
  try {
    await userModel.create({
      fulName,
      email,
      password,
      profileImageURL:`${req.file.filename}`,
    });
    return res.redirect('/login'); // redirect after signup success
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).send("Something went wrong during signup.");
  }
});

router.post('/login', async (req,res)=>{
    const {email,password}= req.body;
   try {
    const token= await  userModel.matchPasswordAndGenToken(email,password);
    if(!token) return res.redirect('/login')
    console.log(token);
  
  
  
    return res.cookie("token",token).redirect('/')
   } catch (error) {
      return res.render("login",{
        error:"incorrect email or password"
      })
   }

  
 
    
})

router.get('/logout',(req,res)=>{
  res.clearCookie('token').redirect('/');
 })

module.exports = router;
