var express = require("express"),
     mongoose=require("mongoose"),
     bodyParser=require("body-parser"),
     app = express(),
     flash=require("connect-flash"),
     methodOverride=require("method-override"),
     passport=require("passport"),
     localStrategy=require("passport-local"),
     expressSession=require("express-session"),
     passportLocalMongoose=require("passport-local-mongoose");
     
// flash configurations
app.use(flash());
     
// Mongoose initialisations
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL,{useMongoClient: true});

//body parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static( __dirname +"/public" ));
// own custom middleware to send currentUser to every route

// requiring models
var seed = require("./seeds.js"),
    Camp = require("./models/campSchema.js"),
    Comment=require("./models/comment.js"),
    User=require("./models/user.js");

// Requiring ROUTES after clearing up the shit
var     campgroundRoutes = require("./routes/campgrounds.js"),
        commentRoutes = require("./routes/comments.js"),
        indexRoutes = require("./routes/index.js");
    
// mehod override functionality for put req
app.use(methodOverride("_method"));

// Authentication shit
app.use(expressSession({
    secret : "hey my dog is the best jacky and tiger",
    // secret is used for encoding and decoding
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
    // anything in use will run on every route
    // res.locals.currentUser - > the thing sent back to the r
});

//   seed()
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
// as all comment routes start with the same string we can do this and it will append this string to every route
app.use(indexRoutes);

app.get("*",function(req,res){
    req.flash("error","dont mess with the url :(");
    res.redirect("/");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("app has started");
});
