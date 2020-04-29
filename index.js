const express  =require("express");
const keys = require('./config/keys');
const mongooose = require("mongoose");
const cookieSession  = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);


if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get('*',(req,res)=>{
        res.sendFile(__dirname,"client","build","index.html");
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server is listening on the port "+PORT);
})

