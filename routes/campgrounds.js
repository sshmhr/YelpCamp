var express = require("express"),
     router = express.Router({mergeParams:true}),
    //  merge params allows us to use id in here too even if its not specefied in the routes
     Camp   = require("../models/campSchema.js"),
     middleware = require("../middleware");
    //  index.js will automatically be imorted bcoz of the name index

// index route
router.get("/",function(req,res){
        // req.user -> contains all the data about the logged in user except password of course
    // if user is not logged in it is not defined 
    Camp.find({},function(err,camps){
        if(err){
            console.log(err);
            req.flash("error","camps not found ");
            res.redirect("/");
        }else{
            res.render("campgrounds/campgrounds.ejs",{camps:camps,currentUser:req.user});
        }
    });
});

// create route
router.post("/",middleware.isLogged,function(req,res){

    var Name = req.body.name; 
    var img = req.body.image;
    var desc = req.body.desc;
    var price=req.body.price;
    Camp.create({name:Name,image:img,description:desc,price:price},function(err,camp){
        if(err){
            req.flash("It is not possible to create the campground");
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            camp.author.id=req.user._id;
            camp.author.username=req.user.username;
            camp.save();
            // console.log(camp);
            req.flash("success","Successfully created a new campground")
            res.redirect("/campgrounds");
        }
    });
});

// new route
router.get("/new",middleware.isLogged,function(req, res) {
    res.render("campgrounds/newcamp.ejs",{currentUser:req.user});
});

// show route
router.get("/:id",function(req,res){
    Camp.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            console.log(err);
            req.flash("error","couldnt find the campground with the given id");
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/show.ejs",{found:found,currentUser:req.user});
        }
    });
});

// Edit route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Camp.findById(req.params.id,function(err,campFound){
        if(err){
            console.log(err);
            req.flash("error","couldnt edit this campground");
            res.render("/campgrounds/");
        }else{
            res.render("campgrounds/edit.ejs",{camp:campFound}); 
        }
    });
});

// update route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    var Name = req.body.name; 
    var img = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    Camp.findByIdAndUpdate(req.params.id,{name:Name,image:img,description:desc,price:price},function(err,camp){
        if(err){
            console.log(err);
            req.flash("error","couldnt find and update the element with the given id");
            res.redirect("/campgrounds");
        }else{
            // camp.author.id=req.user._id;
            // camp.author.username=req.user.username;
            // camp.save();
            // not needed it doesnot replace everything
            // console.log(camp);
             req.flash("success","Successfully edited the campground")
            res.redirect("/campgrounds/"+camp._id);
            }
    });
});

// delete route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Camp.findByIdAndRemove(req.params.id,function(err){
       if(err){
           console.log(err);
       }else{
        req.flash("success","successfully deleted the campground");
        res.redirect("/campgrounds");   
       }
    });
});


module.exports = router;