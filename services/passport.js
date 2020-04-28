const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys  =require("../config/keys");
const mongoose = require("mongoose");

const User  = mongoose.model("users");

passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
   User.findById(id).then(user=>{
       done(null,user);
   })
});

passport.use(new GoogleStrategy({
    clientID:keys.googleClientID,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
},async (accessToken,refreshToken,profile,done)=>{
  const existUser =   await User.findOne({googleId: profile.id});
    if(existUser){
        return  done(null,existUser);//first argument mean no error and second argument is a user;
    }

    const createdUser = await  new User({googleId:profile.id}).save();
    done(null,createdUser)



}));

