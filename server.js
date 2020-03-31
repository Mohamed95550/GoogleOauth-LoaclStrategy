const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
/*const dashboardRoute = require ('./routes/dashboardRoute');
require('./config/passport-setup'); 
const keys = require ('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');*/
const PORT = process.env.PORT || 5000
/*
http://localhost:3000
http://localhost:3000/auth/google/redirect
*/
app.set('view engine','ejs');

//use session
/*app.use(cookieSession({
  maxAge : 24*60*60*1000,
  keys:[keys.cookieKey.key]
}))
*/
if(process.env.NODE_ENV ==='production'){
    app.use(cookieSession({
        maxAge : 24*60*60*1000,
        keys:[keys.cookieKey.key]
      }))
     
     
      app.use(passport.initialize());
      app.use(passport.session());
      

    }
//init passport
/*app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.link, { useNewUrlParser: true, useUnifiedTopology:true });

//process.env.MONGODB_URI
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
*/
//app.use('/dashboard',dashboardRoute);
app.use('/auth',authRoutes);

if(process.env.NODE_ENV ==='production'){
  mongoose.connect(process.env.LINK, { useNewUrlParser: true, useUnifiedTopology:true });
  const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
}

app.get('/',(req,res)=>{
    //res.render("home",{user:req.user});
   res.render("home");
});

app.listen(PORT,()=>{
    console.log('listen on port 5000');
})