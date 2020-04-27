const express  =require("express");
const keys = require('./config/keys');
const mongooose = require("mongoose");
const cookieSession  = require("cookie-session");
const passport = require("passport");
require("./models/user");
require("./services/passport");



mongooose.connect(keys.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true});

const app = express();

app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookeyKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is listening on the port "+PORT);
})

