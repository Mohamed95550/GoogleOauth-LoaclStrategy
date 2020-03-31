const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const User = require('../models/user'); 

passport.serializeUser((user,done) => {
    done(null,user.id);
})

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null,user);
    })    
})

passport.use(new LocalStrategy({ username : 'username'},
(username,password,done )=>{
User.findOne({username:username})
    .then(user => {
        if(!user){return done(null,false,{message:'not found!'})}
     //  bcrypt.compare(password,user.password,(err, ismatch)=>{
       //     if(err){throw err}
         //   if(ismatch){return done(null,user)}
           // else{return done(null,false,{message:'email not registred!'})}
      // })
     else { return done(null,user)}
    })
    .catch(err=>console.log(err))
}))


passport.use(new googleStrategy( {
    //options for google
    callbackURL:'/auth/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret

}, (accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    //passport callback
   User.findOne({googleId:profile.id}).then((currentUser) => {
        if(currentUser){
            console.log('user is :',currentUser);
            done(null,currentUser);
        } else {
            console.log("new user");
    
           new User({
                username:profile.displayName,
                googleId:profile.id,
                thumbnail:profile._json.picture
                        })
                        .save().then((newUser) =>{
                            console.log("user added from google auoth"+newUser);
                            done(null,newUser)
                        })
        }
    })
}))
