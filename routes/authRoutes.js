const router = require('express').Router();
const passport = require('passport');

//route to login
router.get('/login',(req,res)=>{
    res.render("login");
    //res.send("bonjour")
})

//route to logout
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})

router.get('/google/redirect',passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard/');
  });

//route to login
router.get('/google',passport.authenticate('google',{
    scope:['profile']
  }));
  
  router.post('/local',(req, res, next) => {
    passport.authenticate('local', {
      successRedirect:'/dashboard',
      failureRedirect:'/' })(req,res,next);
  });
 

module.exports= router;

