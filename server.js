const express = require('express');
const authRoutes = require('./routes/authRoutes');
const dashboardRoute = require ('./routes/dashboardRoute');
require('./config/passport-setup'); 
const app = express();
const mongoose = require('mongoose');
const keys = require ('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');



app.set('view engine','ejs');

//use session
app.use(cookieSession({
  maxAge : 24*60*60*1000,
  keys:[keys.cookieKey.key]
}))

//init passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.link, { useNewUrlParser: true, useUnifiedTopology:true });

//process.env.MONGODB_URI
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/dashboard',dashboardRoute);
app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.render("home",{user:req.user});
});

app.listen(3000,()=>{
    console.log('listen on port 3000');
})