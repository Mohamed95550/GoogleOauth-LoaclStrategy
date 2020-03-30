const router = require('express').Router();

//middleware
const ensureAuthentificate = (req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login');
    }else{
        next();
    }
    
}

//route to login
router.get('/',ensureAuthentificate,(req,res)=>{
    res.render("dashboard",{user:req.user});
})

module.exports= router;