var express=require("express"),
    router=express.Router({mergeParams:true}),
    Camp = require("../models/campSchema.js"),
    Comment=require("../models/comment.js"),
    middleware=require("../middleware")
// new comment route
router.get("/new",middleware.isLogged,function(req, res) {
    Camp.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            res.render("comments/newComment.ejs",{camp:camp,currentUser:req.user});    
        }
    });
});

// create comment route
router.post("/",middleware.isLogged,function(req,res){
    var comment=req.body.comment;
    Camp.findById(req.params.id,function(err,campFound){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            Comment.create(comment,function(err,comment){
                if(err){
                    console.log(err);
                    req.flash("error","couldnt create a new comment");
                    res.redirect("/campgrounds/"+req.params.id);
                }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campFound.comments.push(comment);
                    campFound.save(function(err,saved){
                        if(err){
                            console.log(err);
                            res.redirect("/campgrounds/"+req.params.id);
                        }else{
                            req.flash("success","Successfully added a new comment")
                            res.redirect("/campgrounds/"+req.params.id);
                        }
                    });
                }
            });
        }
    });
});

// edit comment
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Camp.findById(req.params.id,function(err,foundCamp){
     if(err){
         console.log(err);
         res.redirect("/campgrounds/"+req.params.id);
     }else{
         Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds/"+req.params.id);
                }else{
                    res.render("comments/edit.ejs",{camp:foundCamp,comment:foundComment});
                }
         });
     }
    });
});

// update comments
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res) {
   Comment.findByIdAndUpdate(req.params.comment_id,{text:req.body.text},function(err,updatedcomment){
       if(err){
           console.log(err);
           req.flash("error","couldnt find the comment to update");
           res.redirect("/campgrounds/"+req.params.id);
       }else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   })
});

// delete comment
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            req.flash("success","Successfully deleted the comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});


module.exports = router;