var express=require("express"),
    router=express.Router(),
    User = require("../models/user.js"),
    passport=require("passport");
    
// root route
router.get("/",function(req,res){
    res.render("landing.ejs"
    // ,{currentUser:req.user}
    );
    // currentuser thing is not needed now
});

// authentication routes
router.get("/register",function(req,res){
     res.render("user/signup.ejs",{currentUser:req.user});
});

router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
    if(err){
        console.log(err);
        req.flash("error",err.message);
        return res.redirect("/register");
    }else{
        passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to Yelpcamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    }
});
});

// login
router.get("/login",function(req,res){
    res.render("user/login.ejs",{currentUser:req.user});
});

router.post("/login",passport.authenticate("local",{
    successRedirect : "/campgrounds",
    failureRedirect : "/login",
    successFlash    : "You have Successfully Logged in" ,
    failureFlash    : true
}),function(req,res){
    
});

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","successfully logged You out");
    res.redirect("/campgrounds");
});

module.exports = router;